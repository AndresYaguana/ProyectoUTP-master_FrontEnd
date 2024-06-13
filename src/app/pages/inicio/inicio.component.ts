import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  cursos: Course[] = [
    { titulo: 'Curso de Angular', imagen: 'https://d33wubrfki0l68.cloudfront.net/ff72a984446f3a3cc4aa689c2c409b57344c88e1/cc4c7/assets/images/notes/angular-intro/ventajas-angular.jpg', descripcion: 'Aprende a construir aplicaciones web dinámicas con Angular.', duracion: "", precio: "" },
    { titulo: 'Curso de React', imagen: 'https://th.bing.com/th/id/R.67d796a518f6f81d9a9776ec5faf6e8d?rik=g5CilO3F2Xx7CA&pid=ImgRaw&r=0', descripcion: 'Aprende a construir aplicaciones web dinámicas con React.', duracion: "", precio: "" },
    { titulo: 'Curso de Java', imagen: 'https://www.mytaskpanel.com/wp-content/uploads/2023/04/consulting-blog-09.webp', descripcion: 'Aprende a construir aplicaciones web dinámicas con Java.', duracion: "", precio: "" },
    { titulo: 'Curso de PHP', imagen: 'https://ultahost.com/blog/wp-content/uploads/2023/02/Best-Web-Servers-for-PHP-Development-800x451.png', descripcion: 'Aprende a construir aplicaciones web dinámicas con PHP.', duracion: "", precio: "" },
    { titulo: 'Curso de Python', imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/04/raspberry-lanza-editor-codigo-aprender-python-lenguaje-ia-3008158.jpg?tf=1200x', descripcion: 'Aprende a construir aplicaciones web dinámicas con Python.', duracion: "", precio: "" },
    { titulo: 'Curso de JavaScript', imagen: 'https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto', descripcion: 'Aprende a construir aplicaciones web dinámicas con JavaScript.', duracion: "", precio: "" },
    
    // Añade más cursos aquí
  ];

  filteredCursos: Course[] = [];
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredCursos = this.cursos; // Mostrar inicialmente todos los cursos
  }

  filterCourses(): void {
    this.filteredCursos = this.cursos.filter(course => {
      const lowercaseTitle = course.titulo.toLowerCase();
      return lowercaseTitle.includes(this.searchTerm.toLowerCase());
    });
  }

  onEnter(event: Event): void { // Can accept any Event type initially
    if ((event as KeyboardEvent).key === 'Enter') {
      // Trigger course filtering here
      this.filterCourses();
    }
  }
  
  }

interface Course {
  titulo: string;
  imagen: string;
  descripcion: string;
  duracion: string;
  precio: string;
}
