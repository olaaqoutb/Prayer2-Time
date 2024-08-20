
import "./App.css"
import Container from '@mui/material/Container';
import MainContent from './Components/MainContent'; 
function App() {
  return (
    <>
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: "100vh", // اجعل الارتفاع متساوي مع ارتفاع النافذة
          overflow: "hidden", // إلغاء التمرير
          margin: 0, 
          padding: 0,
        }}
      >
        <Container maxWidth="xl">
          <MainContent/>
        </Container>
      </div>
    </>
  );
}


export default App
