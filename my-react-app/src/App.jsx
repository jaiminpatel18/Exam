import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRGenerator from './components/QRGenerator';
import ProtectedContent from './pages/ProtectedContent';

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <Routes>
          {/* Home page shows the QR code */}
          <Route path="/" element={
            <>
              <h1>My Geofenced App</h1>
              <QRGenerator />
            </>
          } />
          
          {/* This is the link encoded in the QR code */}
          <Route path="/restricted" element={<ProtectedContent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;