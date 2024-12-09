'use client';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <h1>Gestión de Proyectos</h1>
          <p>Aquí puedes gestionar todos tus proyectos de manera eficiente.</p>
          <ul className="project-list">
            <li>Proyecto 1</li>
            <li>Proyecto 2</li>
            <li>Proyecto 3</li>
          </ul>
        </main>
      </div>
      <Footer />
    </div>
  );
}
