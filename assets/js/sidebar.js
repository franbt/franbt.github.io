document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tree-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      this.parentElement.classList.toggle("open");
    });
  });
});
