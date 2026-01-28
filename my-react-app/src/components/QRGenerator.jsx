import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = () => {
  // Use your actual deployed URL here later
  const restrictedUrl = `${window.location.origin}/restricted`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Scan to Access Content</h2>
      <QRCodeSVG value={restrictedUrl} size={200} includeMargin={true} />
      <p>This link only works within 500m of the target location.</p>
    </div>
  );
};

export default QRGenerator;