 import '/src/styles/index.css'

 window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").classList.add("d-none");
        
      }, 500);
    });
 
 const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }else{
             entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });

  document.getElementById("year").textContent = new Date().getFullYear();