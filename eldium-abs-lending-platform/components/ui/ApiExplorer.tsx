
import React, { useState, useEffect } from 'react';
// FIX: Import MOCK_API_DATA_STORE from constants and remove from types import
import { ApiEndpointDefinition, HttpMethod, ApiParameter, ApiRequestData, ApiResponseData } from '../../types';
import { MOCK_API_ENDPOINTS, MOCK_API_DATA_STORE } from '../../constants';
import Button from './Button';
// FIX: Import Card component
import Card from './Card';
import { IconCodeBracket, IconPlay, IconChevronDown } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';

const ApiExplorer: React.FC = () => {
  const { primaryColor } = useTheme();
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(MOCK_API_ENDPOINTS[0].id);
  const [method, setMethod] = useState<HttpMethod>(MOCK_API_ENDPOINTS[0].method);
  const [path, setPath] = useState<string>(MOCK_API_ENDPOINTS[0].defaultPath || MOCK_API_ENDPOINTS[0].pathTemplate);
  
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<ApiParameter[]>([{ name: '', value: '' }]);
  const [headers, setHeaders] = useState<ApiParameter[]>([
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Authorization', value: 'Bearer MOCK_API_KEY_XYZ' }
  ]);
  const [body, setBody] = useState<string>(MOCK_API_ENDPOINTS[0].defaultBody || '');
  
  const [response, setResponse] = useState<ApiResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeRequestTab, setActiveRequestTab] = useState<'params' | 'headers' | 'body'>('params');
  const [activeResponseTab, setActiveResponseTab] = useState<'body' | 'headers'>('body');

  const selectedEndpoint = MOCK_API_ENDPOINTS.find(ep => ep.id === selectedEndpointId) || MOCK_API_ENDPOINTS[0];

  useEffect(() => {
    const endpoint = MOCK_API_ENDPOINTS.find(ep => ep.id === selectedEndpointId);
    if (endpoint) {
      setMethod(endpoint.method);
      setPath(endpoint.defaultPath || endpoint.pathTemplate);
      setBody(endpoint.defaultBody || (endpoint.method === 'POST' || endpoint.method === 'PUT' ? '{\n  \n}' : ''));
      setPathParams({}); // Reset path params
      setQueryParams([{ name: '', value: '' }]); // Reset query params
      setResponse(null);
      if(endpoint.method === 'POST' || endpoint.method === 'PUT') setActiveRequestTab('body');
      else setActiveRequestTab('params');
    }
  }, [selectedEndpointId]);

  const handleParamChange = (index: number, field: 'name' | 'value', type: 'query' | 'header', newValue: string) => {
    const setter = type === 'query' ? setQueryParams : setHeaders;
    const params = type === 'query' ? queryParams : headers;
    const newParams = [...params];
    newParams[index][field] = newValue;
    setter(newParams);
  };

  const addParam = (type: 'query' | 'header') => {
    const setter = type === 'query' ? setQueryParams : setHeaders;
    setter(prev => [...prev, { name: '', value: '' }]);
  };

  const removeParam = (index: number, type: 'query' | 'header') => {
    const setter = type === 'query' ? setQueryParams : setHeaders;
    setter(prev => prev.filter((_, i) => i !== index));
  };
  
  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPath(e.target.value);
      // Extract path params
      const endpointPathParts = selectedEndpoint.pathTemplate.split('/');
      const currentPathParts = e.target.value.split('/');
      const newPathParams: Record<string, string> = {};
      endpointPathParts.forEach((part, i) => {
          if (part.startsWith('{') && part.endsWith('}') && currentPathParts[i]) {
              const paramName = part.slice(1, -1);
              newPathParams[paramName] = currentPathParts[i];
          }
      });
      setPathParams(newPathParams);
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse(null);

    const requestData: ApiRequestData = {
      method,
      path,
      pathParams,
      queryParams: queryParams.filter(p => p.name),
      headers: headers.filter(h => h.name),
      body: (method === 'POST' || method === 'PUT' || method === 'PATCH') ? body : null,
    };
    
    const startTime = Date.now();
    try {
      const res = await selectedEndpoint.handler(requestData, MOCK_API_DATA_STORE);
      const endTime = Date.now();
      let responseBody = res.body;
      if (typeof res.body === 'object' && res.body !== null) {
          responseBody = JSON.stringify(res.body, null, 2);
      // FIX: Corrected condition for checking if res.body is a string and then calling trim()
      } else if (typeof res.body === 'string' && (res.body.trim().startsWith('{') || res.body.trim().startsWith('['))) {
          // Attempt to pretty print if it looks like JSON string
          try {
            // res.body is confirmed string here
            responseBody = JSON.stringify(JSON.parse(res.body), null, 2);
          } catch (e) { /* Ignore, keep as is */ }
      }

      setResponse({
        ...res,
        body: responseBody, // Store the pretty-printed string or original
        size: typeof responseBody === 'string' ? new TextEncoder().encode(responseBody).length : 0,
        time: endTime - startTime,
      });
    } catch (error: any) {
        const endTime = Date.now();
        setResponse({
            status: 500,
            statusText: "Handler Error",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ error: "Mock handler failed", details: error.message || String(error) }, null, 2),
            time: endTime - startTime,
        });
    }
    setIsLoading(false);
    setActiveResponseTab('body');
  };
  
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-red-500';
    if (status >= 500) return 'text-orange-500';
    return 'text-yellow-500'; // For 3xx or others
  };

  const renderKeyValueInputs = (type: 'query' | 'header') => {
    const params = type === 'query' ? queryParams : headers;
    return (
      <div className="space-y-2 text-xs">
        {params.map((param, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Key"
              value={param.name}
              onChange={(e) => handleParamChange(index, 'name', type, e.target.value)}
              className="flex-1 p-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-primary-light focus:border-primary-light text-xs"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => handleParamChange(index, 'value', type, e.target.value)}
              className="flex-1 p-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-primary-light focus:border-primary-light text-xs"
            />
            <Button variant="danger" size="sm" onClick={() => removeParam(index, type)} className="!p-1 text-xs">✕</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addParam(type)} className="text-xs !px-2 !py-1">Add {type === 'query' ? 'Parameter' : 'Header'}</Button>
      </div>
    );
  };


  return (
    <Card title="API Explorer" titleSize="lg" className="font-sans" actions={<IconCodeBracket className="w-5 h-5 text-gray-400"/>}>
      <div className="p-2 space-y-4">
        {/* Endpoint Selection */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedEndpointId}
            onChange={(e) => setSelectedEndpointId(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-primary-light focus:border-primary-light text-sm font-medium"
            style={{color: primaryColor}}
          >
            {MOCK_API_ENDPOINTS.map(ep => (
              <option key={ep.id} value={ep.id}>
                {ep.method} - {ep.description}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={path}
            onChange={handlePathChange}
            placeholder="/api/v1/resource/{id}"
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-primary-light focus:border-primary-light font-mono text-sm"
          />
          <Button variant="primary" onClick={handleSendRequest} disabled={isLoading} className="text-sm px-3 py-2">
            {isLoading ? 'Sending...' : <IconPlay className="w-4 h-4 mr-1"/>} Send
          </Button>
        </div>

        {/* Request Configuration */}
        {/* FIX: Used Card component */}
        <Card title="Request" titleSize='sm' className="border dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-1 -mb-px" aria-label="Tabs">
              { (method !== 'GET' && method !== 'DELETE') ? ['body', 'params', 'headers'].map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => setActiveRequestTab(tabName as any)}
                  className={`whitespace-nowrap py-2 px-3 border-b-2 text-xs font-medium focus:outline-none
                    ${activeRequestTab === tabName
                      ? 'border-primary text-primary dark:text-primary-light'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}`}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </button>
              )) : ['params', 'headers'].map((tabName) => (
                 <button
                  key={tabName}
                  onClick={() => setActiveRequestTab(tabName as any)}
                  className={`whitespace-nowrap py-2 px-3 border-b-2 text-xs font-medium focus:outline-none
                    ${activeRequestTab === tabName
                      ? 'border-primary text-primary dark:text-primary-light'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}`}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </button>
              ))
              }
            </nav>
          </div>
          <div className="p-2">
            {activeRequestTab === 'params' && renderKeyValueInputs('query')}
            {activeRequestTab === 'headers' && renderKeyValueInputs('header')}
            {activeRequestTab === 'body' && (method === 'POST' || method === 'PUT' || method === 'PATCH') && (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="JSON request body"
                rows={8}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-primary-light focus:border-primary-light font-mono text-xs"
              />
            )}
             {activeRequestTab === 'body' && (method === 'GET' || method === 'DELETE') && (
                <p className="text-xs text-gray-500 dark:text-gray-400 p-2">Request body is not applicable for {method} requests.</p>
            )}
          </div>
        </Card>

        {/* Response Display */}
        {isLoading && <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading response...</div>}
        {response && (
          // FIX: Used Card component
          <Card title="Response" titleSize='sm' className="border dark:border-gray-700">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 text-xs">
                <div>
                    Status: <span className={`font-semibold ${getStatusColor(response.status)}`}>{response.status} {response.statusText}</span>
                </div>
                <div>Time: <span className="font-semibold">{response.time} ms</span></div>
                <div>Size: <span className="font-semibold">{(response.size || 0) / 1000} KB</span></div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-1 -mb-px" aria-label="Tabs">
                {['body', 'headers'].map((tabName) => (
                    <button
                    key={tabName}
                    onClick={() => setActiveResponseTab(tabName as any)}
                    className={`whitespace-nowrap py-2 px-3 border-b-2 text-xs font-medium focus:outline-none
                        ${activeResponseTab === tabName
                        ? 'border-primary text-primary dark:text-primary-light'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}`}
                    >
                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                    </button>
                ))}
                </nav>
            </div>
            <div className="p-0">
              {activeResponseTab === 'body' && (
                <pre className="p-2 text-xs bg-gray-50 dark:bg-gray-900/50 rounded-b-md overflow-x-auto max-h-96">
                  <code>{response.body !== null && response.body !== undefined ? String(response.body) : '(No content)'}</code>
                </pre>
              )}
              {activeResponseTab === 'headers' && (
                <div className="p-2 text-xs space-y-0.5 max-h-96 overflow-y-auto">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">{key}:</span> <span className="text-gray-500 dark:text-gray-400">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default ApiExplorer;