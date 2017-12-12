var laziness = (function () {
  var lazy = [];

  registerListener('load', setLazy);
  registerListener('load', lazyLoad);
  registerListener('scroll', lazyLoad);
  registerListener('resize', lazyLoad);


  // setLazy function creates an array of elements for lazy-loading
  function setLazy(){
    document.getElementById('listing').removeChild(document.getElementById('viewMore'));
    document.getElementById('nextPage').removeAttribute('class');

    lazy = document.getElementsByClassName('lazy');
    console.log('Found ' + lazy.length + ' lazy images');
  } 

  // lazyLoad function checks if the image is in the viewport and adjusts its CSS class name if so, which shows the image on the page. Then it uses the cleanLazy function to remove that image(s) from the "lazy" array because they are now on the page
  function lazyLoad(){
    for(var i = 0; i < lazy.length; i++){
      if(isInViewport(lazy[i])){
        if (lazy[i].getAttribute('data-src')){
          lazy[i].src = lazy[i].getAttribute('data-src');
          lazy[i].removeAttribute('data-src');
        }
      }
    }
  
    cleanLazy();
  }


  function cleanLazy(){
    lazy = Array.prototype.filter.call(lazy, function(l){ 
      return l.getAttribute('data-src');
    });
  }


  function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
      rect.bottom >= 0 && 
      rect.right >= 0 && 
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
  }


  function registerListener(event, func) {
    if (window.addEventListener) {
      window.addEventListener(event, func)
    } else {
      window.attachEvent('on' + event, func)
    }
  }
})();
