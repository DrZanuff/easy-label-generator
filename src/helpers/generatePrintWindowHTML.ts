export const generatePrintWindowHTML = (imageUrl: string): string => {
  return /*html*/ `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shipping Label</title>
        <style>
          body { 
            margin: 0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background: #fff;
          }
          img { 
            max-width: 100%; 
            max-height: 100%; 
          }
        </style>
      </head>
      <body>
        <img src="${imageUrl}" alt="Shipping Label" 
             onload="window.print(); window.onafterprint = window.close();" />
      </body>
    </html>
  `
}
