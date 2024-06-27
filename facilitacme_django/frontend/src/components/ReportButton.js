import React from 'react';
import api from '../services/api';

const ReportButton = () => {
    const handleDownload = () => {
        api.get('failures/generate_report/', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'failure_report.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                console.error('There was an error generating the report!', error);
            });
    };

    return (
        <button onClick={handleDownload}>Download Failures Report</button>
    );
};

export default ReportButton;