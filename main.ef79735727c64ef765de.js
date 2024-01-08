"use strict";(self.webpackChunkhorario_uc=self.webpackChunkhorario_uc||[]).push([[179],{9546:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),a=n(5697),o=n.n(a);const s=function(){return r.createElement("footer",{className:"footer mt-auto py-3 bg-light"},r.createElement("div",{className:"container-fluid text-center"},r.createElement("span",{className:"navbar-text w-100"},"Colabora con este proyecto en"," "),r.createElement("a",{href:"https://github.com/aurmeneta/HorarioUC"},"GitHub"),r.createElement("br",null),r.createElement("span",{className:"navbar-text w-100"},"Si tienes algún comentario o sugerencia, por favor deja tu feedback en este"," "),r.createElement("a",{href:"https://forms.gle/WitMyxhgqR5BhZgMA",target:"_blank",rel:"noreferrer"},"formulario")," ","o abre un Issue en GitHub.",r.createElement("br",null),r.createElement("span",{className:"w-100 navbar-text"},"v".concat("1.6.0"))))};n(3863);const c=function(){return r.createElement("nav",{className:"navbar navbar-expand-sm navbar-light bg-light"},r.createElement("div",{className:"container-fluid"},r.createElement("a",{className:"navbar-brand",href:"/"},"HorarioUC"),r.createElement("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},r.createElement("span",{className:"navbar-toggler-icon"})),r.createElement("div",{className:"collapse navbar-collapse",id:"navbarNav"},r.createElement("ul",{className:"navbar-nav"},r.createElement("li",{className:"nav-item"},r.createElement("a",{className:"nav-link",href:"/"},"Inicio")),r.createElement("li",{className:"nav-item"},r.createElement("a",{className:"nav-link",href:"/choques.html"},"Configurar choques"))))))};function i(e){var t=e.children;return r.createElement(r.Fragment,null,r.createElement(c,null),r.createElement("div",{className:"container-fluid pt-2"},t),r.createElement(s,null))}i.propTypes={children:o().oneOfType([o().arrayOf(o().element),o().element]).isRequired};const l=i},9206:(e,t,n)=>{var r=n(7294),a=n(745),o=n(5671),s=n(9466),c=n(7326),i=n(9340),l=n(2963),u=n(1120),m=n(7335),d=n(7662),g=n.n(d),p=n(3521),f=n(9042),v=n(5496),h=n(5697),b=n.n(h),E=n(2902);function y(e){var t=e.sigla,n=e.borrarSigla,a=e.seccionesSeleccionadas,o=e.elegirSeccion,s=t.sigla,c=t.grupos,i=t.secciones,l=a[s]||0;return r.createElement("tr",null,r.createElement("td",null,s),r.createElement("td",null,t.nombre),r.createElement("td",null,t.n_secciones),r.createElement("td",null,r.createElement("select",{className:"form-control-sm w-75",name:s,value:l,onChange:o},r.createElement("option",{value:0},"Todas"),i.map((function(e){var t=e.seccion,n=e.profesor;return r.createElement("option",{key:t,value:t},"".concat(t," - ").concat(n.join(", ")))})))),r.createElement("td",null,c.length),r.createElement("td",null,r.createElement("button",{className:"btn btn-danger",type:"button",onClick:function(e){return n(e,t)}},"X")))}y.propTypes={sigla:b().instanceOf(E.Z).isRequired,borrarSigla:b().func.isRequired,elegirSeccion:b().func.isRequired,seccionesSeleccionadas:b().objectOf(b().number).isRequired};const x=y;function w(e){var t=e.siglas,n=e.borrarSigla,a=e.elegirSeccion,o=e.seccionesSeleccionadas;return r.createElement("div",{className:"table-responsive-md"},r.createElement("table",{className:"table table-sm"},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Sigla"),r.createElement("th",null,"Nombre"),r.createElement("th",null,"Secciones"),r.createElement("th",null,"Sección"),r.createElement("th",null,"Horarios"),r.createElement("th",null,"Eliminar"))),r.createElement("tbody",null,t.map((function(e){return r.createElement(x,{key:e.sigla,sigla:e,borrarSigla:n,elegirSeccion:a,seccionesSeleccionadas:o})})))))}w.propTypes={siglas:b().arrayOf(b().instanceOf(E.Z)).isRequired,borrarSigla:b().func.isRequired,elegirSeccion:b().func.isRequired,seccionesSeleccionadas:b().objectOf(b().number).isRequired};const S=w;var N=n(4759);function k(){return r.createElement("div",{className:"col"},r.createElement("h3",null,"Ha ocurrido un error y este componente no se ha podido renderizar"))}function C(e){var t=e.children;return r.createElement(N.S,{fallbackUI:k},t)}C.propTypes={children:b().arrayOf(b().element).isRequired};const Z=C;var q=n(1508);function R(e){var t=e.siglas,n=e.borrarSigla,a=e.combinaciones,o=e.elegirSeccion,s=e.seccionesSeleccionadas;return r.createElement("div",{className:"col"},r.createElement("div",{className:"card border-0"},r.createElement("div",{className:"card-body"},r.createElement(Z,null,r.createElement("h5",{className:"card-title"},"Tus cursos"),r.createElement(S,{siglas:t,borrarSigla:n,elegirSeccion:o,seccionesSeleccionadas:s}),r.createElement("p",null,"".concat(a.length," combinaciones"))))))}R.propTypes={combinaciones:b().arrayOf(b().arrayOf(b().instanceOf(q.Z))).isRequired,borrarSigla:b().func.isRequired,elegirSeccion:b().func.isRequired,siglas:b().arrayOf(b().instanceOf(E.Z)).isRequired,seccionesSeleccionadas:b().objectOf(b().number).isRequired};const B=R;var O=n(885);function I(e){var t=e.onClick;return e.buscando?r.createElement("button",{className:"btn btn-warning",type:"button"},"Buscando..."):r.createElement("button",{className:"btn btn-success",onClick:t,type:"button"},"Agregar")}I.propTypes={onClick:b().func.isRequired,buscando:b().bool.isRequired};const P=I;function M(e){var t=e.periodo,n=e.buscando,a=e.agregarSigla,o=e.elegirPeriodo,s=(0,r.useState)(""),c=(0,O.Z)(s,2),i=c[0],l=c[1],u=(0,r.useState)((0,f.Mz)()),m=(0,O.Z)(u,2),d=m[0],g=m[1];return(0,r.useEffect)((function(){(0,f.QE)().then((function(){return g((0,f.Mz)())}))}),[]),r.createElement("form",null,r.createElement("div",{className:"form-group row"},r.createElement("label",{htmlFor:"#periodoInput",className:"col-md-5 col-sm-3 col-form-label"},"Semestre"),r.createElement("div",{className:"col-md-8 col-sm-9 mb-2"},r.createElement("select",{id:"periodoInput",className:"form-select",value:t,onChange:function(e){e.preventDefault(),o(e.target.value)}},d.map((function(e){return r.createElement("option",{key:e,value:e},e)}))))),r.createElement("div",{className:"alert alert-warning col-md-8 col-sm-9"},"Busca solo la sigla del curso, la sección o el profesor lo podrás elegir después."),r.createElement("div",{className:"form-group row"},r.createElement("label",{className:"col-md-5 col-sm-3 col-form-label"},"Sigla"),r.createElement("div",{className:"col-md-8 col-sm-9"},r.createElement("input",{type:"text",name:"sigla",className:"form-control",placeholder:"MAT1620",value:i,onChange:function(e){e.preventDefault(),l(e.target.value.toUpperCase())}}))),r.createElement("div",{className:"mt-2"},r.createElement(P,{onClick:function(e){e.preventDefault(),i&&a(i)},buscando:n})))}M.propTypes={buscando:b().bool.isRequired,agregarSigla:b().func.isRequired,periodo:b().string,elegirPeriodo:b().func},M.defaultProps={periodo:(0,f.LB)(),elegirPeriodo:function(){return null}};const T=M;function A(e){var t=e.errorEnBusqueda;return t?r.createElement("div",{className:"alert alert-danger mt-2 w-auto"},t||""):null}A.propTypes={errorEnBusqueda:b().string.isRequired};const H=A;function _(e){var t=e.agregarSigla,n=e.buscando,a=e.errorEnBusqueda,o=e.periodo,s=e.elegirPeriodo;return r.createElement("div",{className:"col-md-4"},r.createElement("div",{className:"card border-0"},r.createElement("div",{className:"card-body"},r.createElement(Z,null,r.createElement("h5",{className:"card-title"},"Buscar cursos"),r.createElement(T,{agregarSigla:t,buscando:n,periodo:o,elegirPeriodo:s}),r.createElement(H,{errorEnBusqueda:a})))))}_.propTypes={agregarSigla:b().func.isRequired,buscando:b().bool,errorEnBusqueda:b().string,periodo:b().string,elegirPeriodo:b().func},_.defaultProps={buscando:!1,errorEnBusqueda:"",periodo:(0,f.LB)(),elegirPeriodo:function(){return null}};const L=_;function z(e){var t=e.index,n=e.dia,a=e.tipo_semestre;return r.createElement("tr",{key:p.gI[t]},r.createElement("td",{key:t},p.RH[a][t]),n.map((function(e,t){return r.createElement("td",{className:"p-0",key:p.gI[t]},e.length>0?e.map((function(e){return r.createElement("div",{key:e.sigla,className:"".concat(e.tipo," modulo-cell")},"".concat(e.sigla,"-").concat(e.secciones.toString()))})):"-")})))}function j(){return r.createElement("tr",null,r.createElement("td",{id:"almuerzo",colSpan:p.gI.length+1},"ALMUERZO"))}function D(e){var t,n=e.combinacion,a=e.anterior,o=e.siguiente,s=e.semestre,c=e.index;if(!n)return r.createElement("p",null,"¡No hay combinación!");for(var i=[],l=null!==(t=p.XH[s])&&void 0!==t?t:p.xk,u=0;u<p.a9[l];u+=1){for(var m=[],d=0;d<p.gI.length;d+=1)m.push([]);i.push(m)}return n.forEach((function(e){var t=e.sigla,n=e.secciones.map((function(e){return e.seccion}));n.sort((function(e,t){return e-t})),e.horario.forEach((function(e){var r=p.gI.indexOf(e.dia),a=e.hora,o=e.tipo;a<1||a>p.a9[l]||"SIN HORARIO"===e.dia||i[a-1][r].push({sigla:t,tipo:o,secciones:n})}))})),r.createElement("div",{className:"col-xl"},r.createElement("div",{className:"container-fluid text-center mb-2 d-inline d-flex"},r.createElement("button",{className:"btn btn-primary",onClick:a,type:"button"},"Anterior"),r.createElement("h5",{className:"flex-grow-1 align-self-center m-0"},"Combinación ".concat(c+1)),r.createElement("button",{className:"btn btn-primary",onClick:o,type:"button"},"Siguiente")),r.createElement("div",{className:"table-responsive-lg"},r.createElement("table",{className:"table table-bordered table-sm text-center table-hover",id:"horario",style:{"--bs-border-opacity":.5}},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Módulo"),p.gI.map((function(e){return r.createElement("th",{key:e},"".concat(e))})))),r.createElement("tbody",null,i.map((function(e,t){return t===p.BA[l]?r.createElement(r.Fragment,{key:"A"},r.createElement(j,{key:"A"}),r.createElement(z,{key:t,dia:e,tipo_semestre:l,index:t})):r.createElement(z,{key:t,dia:e,tipo_semestre:l,index:t})}))))))}z.propTypes={index:b().number.isRequired,dia:b().arrayOf(b().arrayOf(b().shape({secciones:b().arrayOf(b().number),sigla:b().string,tipo:b().string}))).isRequired,tipo_semestre:b().string.isRequired},D.propTypes={combinacion:b().arrayOf(b().instanceOf(q.Z)).isRequired,anterior:b().func,siguiente:b().func,semestre:b().string.isRequired,index:b().number},D.defaultProps={anterior:function(){return null},siguiente:function(){return null},index:0};const U=D;var V=n(2982);function F(e){var t=e.grupo,n=e.guardarCursoCupos,a=t.nombre,o=t.sigla,s=(0,V.Z)(t.secciones),c=(s=s.sort((function(e,t){return e.seccion-t.seccion}))).length,i=s.shift();return i?r.createElement(r.Fragment,null,r.createElement("tr",null,r.createElement("td",{rowSpan:c,className:"align-middle"},o),r.createElement("td",{rowSpan:c,className:"align-middle"},a),r.createElement("td",null,i.seccion),r.createElement("td",null,i.nrc),r.createElement("td",null,i.profesor.toLocaleString().replace(",",", ")),r.createElement("td",null,i.vacantes_disponibles),r.createElement("td",null,r.createElement("button",{className:"btn btn-link btn-sm",type:"button","data-bs-toggle":"modal",onClick:function(){return n({nrc:i.nrc,sigla:"".concat(i.sigla,"-").concat(i.seccion),nombre:i.nombre})},"data-bs-target":"#modalCupos"},"Ver cupos"))),s.map((function(e){var t=e.seccion,s=e.nrc,c=e.profesor,i=e.vacantes_disponibles;return r.createElement("tr",{key:t},r.createElement("td",null,t),r.createElement("td",null,s),r.createElement("td",null,c.toLocaleString().replace(",",", ")),r.createElement("td",null,i),r.createElement("td",null,r.createElement("button",{className:"btn btn-link btn-sm","data-bs-toggle":"modal",type:"button",onClick:function(){return n({nrc:s,sigla:"".concat(o,"-").concat(t),nombre:a})},"data-bs-target":"#modalCupos"},"Ver cupos")))}))):r.createElement("p",null,"No hay primera seccion")}F.propTypes={grupo:b().instanceOf(q.Z).isRequired,guardarCursoCupos:b().func.isRequired};const Q=F;function J(e){var t=e.combinacion,n=e.guardarCursoCupos;return r.createElement("div",{className:"col-xl table-responsive"},r.createElement("table",{className:"table-sm table"},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Sigla"),r.createElement("th",null,"Nombre"),r.createElement("th",null,"Sección"),r.createElement("th",null,"NRC"),r.createElement("th",null,"Profesor"),r.createElement("th",null,"Cupos disponibles"),r.createElement("th",null,"Detalle cupos"))),r.createElement("tbody",null,t.map((function(e){return r.createElement(Q,{key:e.sigla,grupo:e,guardarCursoCupos:n})})))))}J.propTypes={combinacion:b().arrayOf(b().instanceOf(q.Z)).isRequired,guardarCursoCupos:b().func.isRequired};const X=J;var G=(0,f.Sj)().filter((function(e){return e.valido()})),W=function(e){(0,i.Z)(m,e);var t,n,a=(t=m,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.Z)(t);if(n){var a=(0,u.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,l.Z)(this,e)});function m(e){var t;return(0,o.Z)(this,m),(t=a.call(this,e)).state={index:0},t.siguiente=t.siguiente.bind((0,c.Z)(t)),t.anterior=t.anterior.bind((0,c.Z)(t)),t.resetIndex=t.resetIndex.bind((0,c.Z)(t)),t}return(0,s.Z)(m,[{key:"componentDidUpdate",value:function(e){e.combinaciones!==this.props.combinaciones&&this.resetIndex()}},{key:"resetIndex",value:function(){this.setState({index:0})}},{key:"siguiente",value:function(e){var t=this;e.preventDefault(),this.setState((function(e){var n=e.index,r=t.props.combinaciones;return n>=r.length-1?{index:r.length-1}:{index:n+1}}))}},{key:"anterior",value:function(e){e.preventDefault(),this.setState((function(e){var t=e.index;return t>0?{index:t-1}:{}}))}},{key:"render",value:function(){var e=this.props,t=e.combinaciones,n=e.guardarCursoCupos,a=e.semestre,o=e.errorEnCombinaciones,s=t.length,c=this.state.index;return c>=s&&0!==s?c=s-1:0===s&&0!==c&&(c=0),r.createElement("div",{className:"col"},r.createElement("div",{className:"card border-0"},r.createElement("div",{className:"card-body"},r.createElement(Z,null,G.length>0?r.createElement("div",{className:"alert alert-warning"},"Se permiten los siguientes choques:",r.createElement("ul",null,G.map((function(e){return r.createElement("li",null,e.toRepr())}))),"Esta función es experimental y podrían omitirse algunas combinaciones.",r.createElement("br",null),"En"," ",r.createElement("a",{href:"/choques.html"},"configuración de choques")," ","puedes cambiar estas reglas."):null,o?r.createElement("div",{className:"alert alert-danger"},"Hubo un error al generar las combinaciones. Por favor, intenta eliminar o cambiar los choques."):null,0===t.length?r.createElement("p",null,"No hay combinaciones"):r.createElement("div",{className:"row"},r.createElement(U,{combinacion:t[c],siguiente:this.siguiente,anterior:this.anterior,semestre:a,index:c}),r.createElement(X,{combinacion:t[c],guardarCursoCupos:n}),r.createElement("br",null))))))}}]),m}(r.Component);W.propTypes={combinaciones:b().arrayOf(b().arrayOf(b().instanceOf(q.Z))).isRequired,guardarCursoCupos:b().func.isRequired,semestre:b().string.isRequired,errorEnCombinaciones:b().bool},W.defaultProps={errorEnCombinaciones:!1};const Y=W;function K(e){var t=e.cupo,n=e.columnasIncluir;return r.createElement("tr",null,r.createElement("td",{className:"ps-3"},t.escuela),n.nivel&&r.createElement("td",null,t.nivel),n.programa&&r.createElement("td",null,t.programa),n.concentracion&&r.createElement("td",null,t.concentracion),n.cohorte&&r.createElement("td",null,t.cohorte),n.admision&&r.createElement("td",null,t.admision),r.createElement("td",null,t.vacantesOfrecidas),r.createElement("td",null,t.vacantesOcupadas),r.createElement("th",null,t.vacantesDisponibles))}n(7424),K.propTypes={cupo:b().shape({escuela:b().string,vacantesDisponibles:b().number,vacantesOcupadas:b().number,vacantesOfrecidas:b().number,nivel:b().string,programa:b().string,concentracion:b().string,cohorte:b().string,admision:b().string}).isRequired,columnasIncluir:b().shape({nivel:b().bool,programa:b().bool,concentracion:b().bool,cohorte:b().bool,admision:b().bool}).isRequired};const $=K;function ee(e){var t=e.cupos,n=t.cupos.some((function(e){return""!==e.nivel})),a=t.cupos.some((function(e){return""!==e.programa})),o=t.cupos.some((function(e){return""!==e.concentracion})),s=t.cupos.some((function(e){return""!==e.cohorte})),c=t.cupos.some((function(e){return""!==e.admision})),i={nivel:n,programa:a,concentracion:o,cohorte:s,admision:c};return r.createElement("div",{className:"table-responsive"},r.createElement("table",{className:"table table-sm"},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",{className:"ps-3"},"Escuela"),n&&r.createElement("th",null,"Nivel"),a&&r.createElement("th",null,"Programa"),o&&r.createElement("th",null,"Concentración"),s&&r.createElement("th",null,"Cohorte"),c&&r.createElement("th",null,"Admisión"),r.createElement("th",null,"Vacantes ofrecidas"),r.createElement("th",null,"Vacantes ocupadas"),r.createElement("th",null,"Vacantes libres"))),r.createElement("tbody",null,t.cupos.map((function(e){return r.createElement($,{cupo:e,key:e.escuela,columnasIncluir:i})})))))}ee.propTypes={cupos:b().shape({escuela:b().string,nrc:b().string,cupos:b().arrayOf(b().shape({nrc:b().string,sigla:b().string,vacantesDisponibles:b().number,cupos:b().arrayOf(b().shape({escuela:b().string,nivel:b().string,programa:b().string,concentracion:b().string,cohorte:b().string,admision:b().string,vacantesDisponibles:b().number,vacantesOcupadas:b().number,vacantesOfrecidas:b().number}))}))}).isRequired};const te=ee;var ne=function(e){(0,i.Z)(c,e);var t,n,a=(t=c,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.Z)(t);if(n){var a=(0,u.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,l.Z)(this,e)});function c(e){var t;return(0,o.Z)(this,c),(t=a.call(this,e)).state={cupos:{},cargando:!0},t}return(0,s.Z)(c,[{key:"componentDidMount",value:function(){this.obtenerCupos()}},{key:"componentDidUpdate",value:function(e){var t=this.props.curso;e.curso.nrc!==t.nrc&&this.obtenerCupos()}},{key:"obtenerCupos",value:function(){var e=this,t=this.props,n=t.curso,r=t.periodo;n.nrc&&(this.setState({cargando:!0}),(0,p.pA)(r,n.nrc).then((function(t){return e.setState({cupos:t,cargando:!1})})))}},{key:"render",value:function(){var e=this.props.curso,t=this.state,n=t.cargando,a=t.cupos;return n?r.createElement("div",{className:"modal",tabIndex:"-1",id:"modalCupos"},r.createElement("div",{className:"modal-dialog modal-lg modal-dialog-centered"},r.createElement("div",{className:"modal-content"},r.createElement("div",{className:"modal-header"},r.createElement("h5",{className:"modal-title"},"".concat(e.sigla," - ").concat(e.nombre)),r.createElement("button",{className:"btn-close","data-bs-dismiss":"modal",type:"button"},r.createElement("span",null))),r.createElement("div",{className:"modal-body text-center"},r.createElement("div",{className:"spinner-border"},r.createElement("span",{className:"visually-hidden"},"Cargando..."))),r.createElement("div",{className:"modal-footer"},r.createElement("button",{className:"btn btn-secondary","data-bs-dismiss":"modal",type:"button"},"Cerrar"))))):r.createElement("div",{className:"modal",tabIndex:"-1",id:"modalCupos"},r.createElement("div",{className:"modal-dialog modal-lg modal-dialog-centered"},r.createElement("div",{className:"modal-content"},r.createElement("div",{className:"modal-header"},r.createElement("h5",{className:"modal-title"},"".concat(e.sigla," - ").concat(e.nombre)),r.createElement("button",{className:"btn-close","data-bs-dismiss":"modal",type:"button"},r.createElement("span",null))),r.createElement("div",{className:"modal-body p-0"},r.createElement(te,{cupos:a})),r.createElement("div",{className:"modal-footer"},a.inseguro?r.createElement("p",{className:"text-muted"},"Esta información podría ser incorrecta. Revisa buscacursos."):null,r.createElement("button",{className:"btn btn-secondary","data-bs-dismiss":"modal",type:"button"},"Cerrar")))))}}]),c}(r.Component);ne.propTypes={curso:b().shape({nrc:b().string,nombre:b().string,sigla:b().string}),periodo:b().string.isRequired},ne.defaultProps={curso:{nrc:"",sigla:"",nombre:""}};const re=ne;var ae=n(9546);var oe=new(g())(v.Z),se=f.Mf();const ce=function(e){(0,i.Z)(d,e);var t,n,a=(t=d,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.Z)(t);if(n){var a=(0,u.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,l.Z)(this,e)});function d(e){var t;return(0,o.Z)(this,d),(t=a.call(this,e)).state={stringSiglas:f.Hs(),periodo:f.LB(),siglas:[],combinaciones:[],seccionesSeleccionadas:{},cambios:!0,buscando:!1,errorEnBusqueda:void 0,cursoCupos:{nrc:"",sigla:"",nombre:""},errorEnCombinaciones:!1},t.agregarSigla=t.agregarSigla.bind((0,c.Z)(t)),t.buscarSiglas=t.buscarSiglas.bind((0,c.Z)(t)),t.generarCombinaciones=t.generarCombinaciones.bind((0,c.Z)(t)),t.borrarSigla=t.borrarSigla.bind((0,c.Z)(t)),t.elegirSeccion=t.elegirSeccion.bind((0,c.Z)(t)),t.actualizarStorage=t.actualizarStorage.bind((0,c.Z)(t)),t.guardarCursoCupos=t.guardarCursoCupos.bind((0,c.Z)(t)),t.elegirPeriodo=t.elegirPeriodo.bind((0,c.Z)(t)),t}return(0,s.Z)(d,[{key:"componentDidMount",value:function(){this.buscarSiglas()}},{key:"componentDidUpdate",value:function(){this.buscarSiglas(),this.generarCombinaciones(),this.actualizarStorage()}},{key:"guardarCursoCupos",value:function(e){this.setState({cursoCupos:e})}},{key:"actualizarStorage",value:function(){var e=this.state.stringSiglas;f.MU(e)}},{key:"borrarSigla",value:function(e,t){e.preventDefault();try{gtag("event","del_sigla",{event_category:"siglas",event_label:"borrar sigla",value:t.sigla})}catch(e){oe.warn("Error al publicar analytics ".concat(e.toString()))}this.setState((function(e){var n=e.siglas,r=e.stringSiglas,a=n.indexOf(t),o=r.indexOf(t.sigla);return a>=0&&n.splice(a,1),o>=0&&r.splice(o,1),{siglas:n,cambios:!0}}))}},{key:"agregarSigla",value:function(e){this.setState((function(t){var n=t.stringSiglas;if(!n.includes(e)){n.push(e);try{gtag("event","add_sigla",{event_category:"siglas",event_label:"añadir sigla",value:e})}catch(e){oe.warn("Error al publicar analytics ".concat(e.toString()))}}return{stringSiglas:n,cambios:!0}}))}},{key:"buscarSiglas",value:function(){var e=this,t=this.state,n=t.stringSiglas,r=t.siglas,a=t.buscando,o=t.periodo;if(!a){var s=[];n.forEach((function(e){r.find((function(t){return t.sigla===e}))||s.push(e)})),s.length>0&&(this.setState({buscando:!0,errorEnBusqueda:void 0}),p.jv(o,s).then((function(t){e.setState((function(e){return{siglas:e.siglas.concat(t),cambios:!0,buscando:!1}}))})).catch((function(t){oe.error("Error al buscar nuevas siglas; ".concat(t)),e.setState((function(e){var r=e.stringSiglas;return s.forEach((function(e){return r.splice(r.indexOf(e),1)})),{stringSiglas:n,buscando:!1,errorEnBusqueda:t.toString()}}))})))}}},{key:"elegirPeriodo",value:function(e){f.OQ(e),this.setState({periodo:e,siglas:[],seccionesSeleccionadas:{},cambios:!0})}},{key:"generarCombinaciones",value:function(){var e=this.state,t=e.siglas,n=e.seccionesSeleccionadas,r=e.cambios,a=e.buscando;if(r&&!a&&0!==t.length){var o=t.map((function(e){var t=n[e.sigla],r=[];return t?r.push(t):r.push(0),e.filtrarPorSecciones(r)})),s=[],c=!1;try{s=p.lJ(o,se)}catch(e){oe.error("Error al generar combinaciones; ".concat(e.toString())),c=!0}this.setState({combinaciones:s,cambios:!1,errorEnCombinaciones:c})}}},{key:"elegirSeccion",value:function(e){e.preventDefault();var t=e.target,n=t.name,r=t.value;this.setState((function(e){var t=e.seccionesSeleccionadas;return t[n]=parseInt(r,10),{seccionesSeleccionadas:t,cambios:!0}}))}},{key:"render",value:function(){var e=this.state,t=e.siglas,n=e.combinaciones,a=e.seccionesSeleccionadas,o=e.buscando,s=e.errorEnBusqueda,c=e.cursoCupos,i=e.periodo,l=e.errorEnCombinaciones;return r.createElement(r.StrictMode,null,r.createElement(m.P,{instance:oe},r.createElement(ae.Z,null,r.createElement(re,{curso:c,periodo:i}),r.createElement("div",{className:"alert alert-info"},r.createElement("b",null,"Choques de módulos:")," ","Si quieres permitir el choque de módulos, puedes configurar las reglas"," ",r.createElement("a",{href:"/choques.html"},"acá"),".",r.createElement("br",null),"Si tienes algún comentario o encuentras algún error, déjalo"," ",r.createElement("a",{href:"https://forms.gle/f4BrPiT7si46yzEA9",target:"_blank",rel:"noreferrer"},"acá"),"."),r.createElement("div",{className:"row"},r.createElement(B,{siglas:t,combinaciones:n,borrarSigla:this.borrarSigla,seccionesSeleccionadas:a,elegirSeccion:this.elegirSeccion}),r.createElement(L,{agregarSigla:this.agregarSigla,buscando:o,errorEnBusqueda:s,periodo:i,elegirPeriodo:this.elegirPeriodo})),r.createElement("div",{className:"row"},r.createElement(Y,{combinaciones:n,guardarCursoCupos:this.guardarCursoCupos,semestre:i,errorEnCombinaciones:l})))))}}]),d}(r.Component);n(4039),n(7654);var ie=document.getElementById("root");(0,a.s)(ie).render(r.createElement(ce,null))},3186:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(885),a=n(5671),o=n(9466);const s=function(){function e(t,n,r,o,s){(0,a.Z)(this,e),this.sigla1=t,this.tipo1=n,this.sigla2=r,this.tipo2=o,this.permitido=s}return(0,o.Z)(e,[{key:"vacio",value:function(){return""===this.sigla1&&""===this.sigla2&&""===this.tipo1&&""===this.tipo2}},{key:"valido",value:function(){return""!==this.sigla1&&""!==this.sigla2&&""!==this.tipo1&&""!==this.tipo2}},{key:"toString",value:function(){return"".concat(this.sigla1,"-").concat(this.tipo1,"-").concat(this.sigla2,"-").concat(this.tipo2,"-").concat(this.permitido.toString())}},{key:"toRepr",value:function(){return"".concat("*"===this.sigla1?"Cualquiera":this.sigla1,"-").concat("*"===this.tipo1?"Cualquiera":this.tipo1," con ").concat("*"===this.sigla2?"Cualquiera":this.sigla2,"-").concat("*"===this.tipo2?"Cualquiera":this.tipo2)}}],[{key:"fromString",value:function(t){var n=t.split("-"),a=(0,r.Z)(n,5);return new e(a[0],a[1],a[2],a[3],"true"===a[4])}}]),e}()},1508:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(9466),a=n(5671);const o=(0,r.Z)((function e(t,n,r,o){(0,a.Z)(this,e),this.sigla=t,this.horario=o,this.nombre=n,this.secciones=r,this.n_secciones=r.length}))},2902:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(2982),a=n(5671),o=n(9466),s=n(419),c=n(1508);const i=function(){function e(t,n,r){(0,a.Z)(this,e),this.sigla=t,this.nombre=n,this.secciones=r.sort((function(e,t){return e.seccion-t.seccion})),this.n_secciones=r.length,this.grupos=this.agruparPorHorario()}return(0,o.Z)(e,[{key:"filtrarPorSecciones",value:function(t){var n=this.secciones.filter((function(e){return t.some((function(t){return t===e.seccion||0===t}))}));return new e(this.sigla,this.nombre,n,n.length)}},{key:"agruparPorHorario",value:function(){for(var e=(0,r.Z)(this.secciones),t=[],n=function(){var n=e.shift(),r=n.horario,a=[];(a=e.filter((function(e){return s.IH.Curso.mismoHorario(n,e)}))).forEach((function(t){return e.splice(e.indexOf(t),1)})),a.unshift(n),t.push(new c.Z(n.sigla,n.nombre,a,r))};e.length>0;)n();return t}}]),e}()},5496:(e,t,n)=>{n.d(t,{Z:()=>r});const r={accessToken:"27511501de6f4b7197797edbd5462860",captureUncaught:!0,captureUnhandledRejections:!0,environment:"production"}},9042:(e,t,n)=>{n.d(t,{Hs:()=>v,LB:()=>p,MU:()=>h,Mf:()=>y,Mz:()=>m,OQ:()=>f,QE:()=>d,Sj:()=>E,lx:()=>b});var r=n(5861),a=n(4687),o=n.n(a),s=n(419),c=n(3186),i=n(3521),l=window.localStorage,u="2024-1";function m(){var e=l.getItem("periodos");return e?e.split(","):[u]}function d(){return g.apply(this,arguments)}function g(){return(g=(0,r.Z)(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.IH.obtenerPeriodos(i.y9);case 2:t=e.sent,l.setItem("periodos",t.toString());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(){return l.getItem("periodo_seleccionado")||u}function f(e){l.setItem("periodo_seleccionado",e)}function v(){var e=l.getItem("siglas_guardadas");return e?e.split(","):["IIC1103","MAT1620"]}function h(e){l.setItem("siglas_guardadas",e.toString())}function b(e){l.setItem("choques",e.toString())}function E(){var e=l.getItem("choques");return e?e.split(",").map((function(e){return c.Z.fromString(e)})):[]}function y(){var e=E(),t=new s.IH.ChoquesPermitidos;return e.forEach((function(e){return t.anadirChoque(e.sigla1,e.tipo1,e.sigla2,e.tipo2,e.permitido)})),t}},3521:(e,t,n)=>{n.d(t,{BA:()=>g,RH:()=>d,XH:()=>u,a9:()=>p,gI:()=>l,jv:()=>h,lJ:()=>b,pA:()=>E,xk:()=>m,y9:()=>f});var r=n(2982),a=n(5861),o=n(4687),s=n.n(o),c=n(419),i=n(2902),l=["L","M","W","J","V","S"],u={"2022-1":"1","2022-2":"1","2022-3":"1","2023-1":"1"},m="2",d={1:["08:30","10:00","11:30","14:00","15:30","17:00","18:30","20:00"],2:["08:20","09:40","11:00","12:20","14:50","16:10","17:30","18:50","20:10"]},g={1:3,2:4},p={1:d[1].length,2:d[2].length},f="https://buscacursos.aurmeneta.cl/",v=function(){var e=(0,a.Z)(s().mark((function e(t,n){var r,a,o,l,u;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.IH.buscarSigla(t,n,f);case 2:if(r=e.sent,0!==(a=r.filter((function(e){return e.sigla===n}))).length){e.next=6;break}return e.abrupt("return",new i.Z(n,"SIN RESULTADOS",[],0));case 6:return o=a[0],l=o.sigla,u=o.nombre,e.abrupt("return",new i.Z(l,u,a));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),h=function(e,t){return Promise.all(t.map((function(t){return v(e,t)})))},b=function(e,t){for(var n=(0,r.Z)(e),a=n.shift().grupos.map((function(e){return[e]})),o=function(){var e=[],o=n.shift();a.forEach((function(n){o.grupos.forEach((function(a){if(n.every((function(e){return c.IH.Curso.horariosCompatibles(a,e,t)}))){var o=(0,r.Z)(n);o.push(a),e.push(o)}}))})),a=e};0!==n.length;)o();return a},E=function(e,t){return c.vl.obtenerCupos(e,t,"https://buscacursos.aurmeneta.cl/informacionVacReserva.ajax.php",f)}},5426:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(8081),a=n.n(r),o=n(3645),s=n.n(o)()(a());s.push([e.id,"body,\nth,\ntd {\n    font-family: Arial, Verdana, Helvetica, sans-serif;\n}\n\ntable {\n    border-collapse: collapse;\n}\n\n.CLAS {\n    background: #fbc575 !important;\n}\n\n.LAB {\n    background: #b3d4f5 !important;\n}\n\n.AYU {\n    background: #99cc99 !important;\n}\n\n.TAL {\n    background: #c7c2f8 !important;\n}\n\n#almuerzo {\n    background: #E7EAF6 !important;\n    letter-spacing: 30px;\n    text-align: center;\n}\n\n#horario {\n    height: 1px;\n}\n\n#horario th {\n    width: 90px;\n}\n\n.modulo-cell {\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\nhtml,\nbody,\n#root {\n    height: 100%;\n}\n",""]);const c=s},7654:(e,t,n)=>{var r=n(3379),a=n.n(r),o=n(7795),s=n.n(o),c=n(569),i=n.n(c),l=n(3565),u=n.n(l),m=n(9216),d=n.n(m),g=n(4589),p=n.n(g),f=n(5426),v={};v.styleTagTransform=p(),v.setAttributes=u(),v.insert=i().bind(null,"head"),v.domAPI=s(),v.insertStyleElement=d(),a()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals},2204:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%272%27 fill=%27%23fff%27/%3e%3c/svg%3e"},9609:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%2386b7fe%27/%3e%3c/svg%3e"},2469:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e"},7486:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e"},991:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%28255, 255, 255, 0.25%29%27/%3e%3c/svg%3e"},4144:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e"},6254:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z%27/%3e%3c/svg%3e"},5321:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23052c65%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},3460:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},1281:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%236ea8fe%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},5647:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z%27/%3e%3c/svg%3e"},1692:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},6770:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},6711:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23dee2e6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},8931:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27M6 10h8%27/%3e%3c/svg%3e"},6199:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e"},2956:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},2221:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%2833, 37, 41, 0.75%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},5122:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%23198754%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e"}},e=>{e.O(0,[216],(()=>(9206,e(e.s=9206)))),e.O()}]);