import Header from './components/Header'
import Footer from './components/Footer'
import Skills from './components/Skills'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import { PortfolioContextProvider } from './context/PortfolioContext'

const App = () => {
  return (
    <PortfolioContextProvider>
      <div>
        <Navbar />
        <main>
          <Header />
          <Skills />
          <About />
          <Projects />
        </main>
        <Footer />
      </div>
    </PortfolioContextProvider>
  )
}

export default App
