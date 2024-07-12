export default function boilerplate(isDarkMode, content) {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Hind Siliguri', sans-serif;
            padding: 15px; 
            background-color: ${isDarkMode ? '#121212' : '#f5f5f5'};
            color: ${isDarkMode ? '#E1E1E1' : '#000000'};
            line-height: 1.6;
            font-size: 16px;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            line-height: 1.2;
          }
          h1 { font-size: 1.6em; font-weight: 600; }
          h2 { font-size: 1.4em; font-weight: 500; }
          h3 { font-size: 1.2em; font-weight: 500; }
          h4 { font-size: 1.0em; font-weight: 500; }
          h5 { font-size: 0.8em; font-weight: 500; }
          h6 { font-size: 0.6em; font-weight: 500; }
          p { margin-bottom: 1em; }
          a { 
            color: ${isDarkMode ? '#BB86FC' : '#1976D2'}; 
            text-decoration: none;
          }
          a:hover { text-decoration: underline; }
          img { 
            max-width: 100%; 
            height: auto; 
            margin: 1em 0;
            border-radius: 4px;
          }
          blockquote {
            margin: 1em 0;
            padding: 0.5em 1em;
            border-left: 4px solid ${isDarkMode ? '#BB86FC' : '#1976D2'};
            background-color: ${isDarkMode ? '#1E1E1E' : '#F5F5F5'};
            font-style: italic;
          }
          pre {
            background-color: ${isDarkMode ? '#1E1E1E' : '#F5F5F5'};
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
          }
          code {
            font-family: monospace;
            background-color: ${isDarkMode ? '#2E2E2E' : '#EAEAEA'};
            padding: 0.2em 0.4em;
            border-radius: 3px;
          }
          ul, ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          li { margin-bottom: 0.5em; }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid ${isDarkMode ? '#444' : '#ddd'};
            padding: 0.5em;
            text-align: left;
          }
          th {
            background-color: ${isDarkMode ? '#2E2E2E' : '#F5F5F5'};
            font-weight: bold;
          }
          .wp-caption {
            max-width: 100%;
            margin: 1em 0;
          }
          .wp-caption img {
            margin: 0;
          }
          .wp-caption-text {
            text-align: center;
            font-style: italic;
            color: ${isDarkMode ? '#AAAAAA' : '#666666'};
            margin-top: 0.5em;
          }
          .aligncenter {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          .alignleft {
            float: left;
            margin-right: 1em;
          }
          .alignright {
            float: right;
            margin-left: 1em;
          }
            .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease;
            opacity: 0;
        }

        /* Style for the pop-up dialog */
        .modal {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            max-height: 80%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            transition: transform 0.3s ease;
            transform: scale(0.8);
        }

        /* Style for the image inside the dialog */
        .modal img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
        }

        /* Style for the buttons */
        .modal button {
            position: absolute;
            top: 10px;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            border: none;
        }

        .close-button {
            right: 10px;
            background: #000;
            color: #fff;
        }

        .save-button {
            right: 80px;
            background: #000;
            color: #fff;
        }

        /* Active state for the modal overlay */
        .modal-overlay.active {
            display: flex;
            opacity: 1;
        }

        /* Active state for the modal dialog */
        .modal-overlay.active .modal {
            transform: scale(1);
        }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}
