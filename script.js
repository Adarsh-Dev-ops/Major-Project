const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");
const progress = progressBar.firstElementChild;

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

function uploadImage() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please choose a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "YOUR_BACKEND_ENDPOINT_HERE", true);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.display = "block";
      progress.style.width = percent + "%";
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      alert("Upload successful!");
      progress.style.width = "0%";
      progressBar.style.display = "none";
      fileInput.value = "";
      preview.style.display = "none";
    } else {
      alert("Upload failed.");
    }
  };

  xhr.send(formData);
}

// Reveal sections on scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));
