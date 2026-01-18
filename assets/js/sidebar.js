document.addEventListener("DOMContentLoaded", function () {
  const treeItems = document.querySelectorAll(".tree-item");

  // Restore open state
  treeItems.forEach(function (item, index) {
    if (localStorage.getItem("tree-item-" + index) === "open") {
      item.classList.add("open");
    }
  });

  // Toggle and save state
  document.querySelectorAll(".tree-toggle").forEach(function (toggle, index) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const item = this.parentElement;
      item.classList.toggle("open");
      localStorage.setItem("tree-item-" + index, item.classList.contains("open") ? "open" : "closed");
    });
  });
});

