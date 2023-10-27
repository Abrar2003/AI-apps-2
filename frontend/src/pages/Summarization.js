import React, { useState } from 'react';
import axios from 'axios';

const Summarization = () => {
  const [summaryRequest, setSummaryRequest] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleSummaryRequestChange = (e) => {
    setSummaryRequest(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select at least one file for summarization.');
      return;
    }

    const formData = new FormData();
    formData.append('summaryRequest', summaryRequest);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://peach-tick-robe.cyclic.app/summarization', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setGeneratedSummary(response.data.summary);
    } catch (error) {
      console.error('Error while making the POST request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="summarization">
      <h2>Summarization</h2>
      <div>
        <label>Summary Request:</label>
        <textarea rows="4" cols="50" value={summaryRequest} onChange={handleSummaryRequestChange} />
      </div>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit}>Generate Summary</button>

      {isLoading && <p>Loading...</p>}

      {generatedSummary && (
        <div>
          <h3>Generated Summary:</h3>
          <p>{generatedSummary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarization;
