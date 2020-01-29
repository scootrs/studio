import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import status from 'http-status';
import { TabularInput } from '~styles/input/tabular';
import { Button } from '~styles/input/button';

const ViewRoot = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const RequestBuilderContainer = styled.div``;

const UrlBuilder = styled.div``;

const Url = styled.p`
  font-family: monospace;
`;

const HeaderBuilder = styled.div``;

const BodyBuilder = styled.div`
  display: flex;
  flex-direction: column;
  align-items; stretch;
`;

const RequestBodyTextArea = styled.textarea`
  font-family: monospace;
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  color: ${({ theme }) => theme.colors.fonts.main};
  padding: 5px;
  border-radius: 3px;
`;

const ErrorMessageSpan = styled.span`
  display: ${({ isShowing }) => (isShowing ? 'block' : 'none')};
  color: ${({ theme }) => theme.colors.alerts.warning};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
`;

const SendButton = styled(Button)`
  align-self: flex-start;
`;

const ResponseHeader = styled.h3`
  margin-bottom: 0px;
`;

const ResponsePre = styled.pre`
  font-family: monospace;
  padding: 10px;
  white-space: pre-wrap;
  border: 1px solid ${({ theme }) => theme.colors.backgrounds.light};
  border-radius: 3px;
`;

const createUrlParamRegex = param => new RegExp(`\{${param ? param : '(.*)'}\}`, 'gi');

function getRawHttpResponseFromAxiosResponse(response) {
  // Build the "raw" response
  let raw = `HTTP/1.1 ${response.status} ${status[response.status]}\n`;

  for (let [name, value] of Object.entries(response.headers)) {
    raw += `${name}: ${value}\n`;
  }

  raw += '\n';

  if (response.data) {
    const dataType = typeof response.data;
    switch (dataType) {
      case 'object':
        raw += JSON.stringify(response.data, null, 4);
        break;
      case 'string':
        raw += response.data;
        break;
      default:
        raw += '* Unable to display response body *';
    }
  }

  return raw;
}

function HttpEventTestPane({ id, url, method }) {
  if (!url) {
    return (
      <ViewRoot>
        <p>You must deploy your configuration successfully before you can test it</p>
      </ViewRoot>
    );
  }

  // Find the URL path parameters
  const re = createUrlParamRegex();
  const initialPathParameters = [];
  let match = null;
  while ((match = re.exec(url)) !== null) {
    initialPathParameters.push({ name: match[1], value: '' });
  }

  // Setup the input state for the component
  const [pathParameters, setPathParameters] = useState(initialPathParameters);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState({
    statusCode: null,
    headers: null,
    body: null,
    raw: null
  });
  const [errorMessage, setErrorMessage] = useState('');

  const pathParametersTabularInputProps = {
    columns: [
      {
        type: 'text',
        label: 'Parameter Name',
        name: 'name',
        value: ''
      },
      {
        type: 'text',
        label: 'Parameter Value',
        name: 'value',
        value: ''
      }
    ],
    rows: pathParameters,
    onUpdateRow: function(row, value) {
      const params = [...pathParameters];
      params[row] = value;
      setPathParameters(params);
    }
  };

  const headersTabularInputProps = {
    columns: [
      {
        type: 'text',
        label: 'Header Name',
        name: 'name',
        value: ''
      },
      {
        type: 'text',
        label: 'Header Value',
        name: 'value',
        value: ''
      }
    ],
    rows: headers,
    onAddRow: function(row) {
      setHeaders([...headers, row]);
    },
    onRemoveRow: function(row) {
      setHeaders(function(prev) {
        return prev.filter(h => h.name !== row.name);
      });
    },
    onUpdateRow: function(row, value) {
      const newHeaders = [...headers];
      newHeaders[row] = value;
      setHeaders(newHeaders);
    }
  };

  //
  // Create all the handlers
  //
  const onRequestBodyChange = function(ev) {
    setBody(ev.target.value);
  };

  const onRequestBodyKeyDown = function(ev) {
    if (ev.key === 'Tab') {
      ev.preventDefault();
      ev.stopPropagation();
      const value = ev.target.value + '    ';
      ev.target.selectionEnd = ev.target.selectionStart + 4;
      setBody(value);
    }
  };

  const onSendRequestButtonClick = async function() {
    // Replace all the URL parameters. As we do this, make sure that all of the URL parameters are present.
    let finalUrl = url;
    for (const param of pathParameters) {
      if (param.value === '') {
        setErrorMessage('The value for the URL parameter "' + param.name + '" is missing');
        return;
      }
      const re = createUrlParamRegex(param.name);
      finalUrl = finalUrl.replace(re, param.value);
    }

    // Generate the headers
    const finalHeaders = headers.reduce(function(h, { name, value }) {
      h[name] = value;
      return h;
    }, {});

    // Create our axios request
    const request = {
      method,
      url: finalUrl,
      data: body,
      headers: finalHeaders
    };

    try {
      console.log(request);
      const response = await axios(request);
      console.log(response);

      const raw = getRawHttpResponseFromAxiosResponse(response);

      setResponse({
        statusCode: response.status,
        headers: response.headers,
        body: response.body,
        raw
      });

      if (errorMessage !== '') {
        setErrorMessage('');
      }
    } catch (err) {
      if (err.response) {
        // We have some information from AXIOS
        console.log(err.response);
        const raw = getRawHttpResponseFromAxiosResponse(err.response);
        setResponse({
          statusCode: err.response.status,
          headers: err.response.headers,
          body: err.response.body,
          raw
        });
      } else {
        setResponse({
          statusCode: null,
          headers: null,
          body: null,
          raw:
            'FAILED TO MAKE REQUEST\n\n' +
            err +
            '\n\n' +
            'Make sure you allow test requests by setting the "Access-Control-Allow-Origin" and ' +
            '"Access-Control-Allow-Headers" headers in your response.\n\n' +
            'You may also have an uncaught error in your handler function that is causing the provider to reject ' +
            'the request due to CORS.'
        });
      }
    }
  };

  return (
    <ViewRoot>
      <RequestBuilderContainer>
        <UrlBuilder>
          <h3>Method &amp; URL</h3>
          <Url>{method.toUpperCase() + ' ' + url}</Url>
          {pathParameters.length > 0 ? <TabularInput {...pathParametersTabularInputProps} /> : <></>}
        </UrlBuilder>
        <HeaderBuilder>
          <h3>HTTP Headers</h3>
          <TabularInput {...headersTabularInputProps} />
        </HeaderBuilder>
        <BodyBuilder>
          <h3>Request Body</h3>
          <RequestBodyTextArea
            value={body}
            onChange={onRequestBodyChange}
            rows={10}
            spellCheck={false}
            onKeyDown={onRequestBodyKeyDown}
          />
        </BodyBuilder>
      </RequestBuilderContainer>
      <SendButton onClick={onSendRequestButtonClick}>Send Request</SendButton>
      <ErrorMessageSpan isShowing={errorMessage !== ''}>{errorMessage}</ErrorMessageSpan>
      <ResponseHeader>Response</ResponseHeader>
      <ResponsePre>{response.raw !== null ? response.raw : ''}</ResponsePre>
    </ViewRoot>
  );
}

export default HttpEventTestPane;