import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {

  slides = [

    {
      img:'../../assets/img/img-1.svg',
      titulo:'Un mejor mundo',
    },
    {
      img:'../../assets/img/img-2.svg',
      titulo:'Un mejor camino',
    },
    {
      img:'../../assets/img/logo-intro.svg',
      titulo:'Hazta la puerta de tu hogar',
    },

  ]
  

  

}
