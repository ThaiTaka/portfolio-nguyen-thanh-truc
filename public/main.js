const API_BASE_URL = window.location.hostname === 'localhost' ? '' : 'https://your-production-api-base-url.com';

document.addEventListener('DOMContentLoaded', () => {
  // Loader animation using transitionend event for better reliability
  const loader = document.getElementById('loader');
  const app = document.getElementById('app');

  // Ensure loader opacity is initially 1
  loader.style.opacity = '1';

  function hideLoader() {
    loader.style.opacity = 0;
  }

  loader.addEventListener('transitionend', () => {
    // Remove loader and show app regardless of opacity value
    console.log('transitionend event fired');
    loader.style.display = 'none';
    app.classList.remove('hidden');
    console.log('Loader hidden, app shown');
    animateSections();
  });

  // Start fadeout after 2.2 seconds
  setTimeout(() => {
    console.log('Starting loader fadeout');
    hideLoader();
  }, 2200);

  // Fallback: forcibly hide loader and show app after 5 seconds if transitionend not fired
  setTimeout(() => {
    if (loader.style.display !== 'none') {
      console.log('Fallback: forcibly hiding loader');
      loader.style.display = 'none';
      app.classList.remove('hidden');
      console.log('Loader forcibly hidden by fallback');
      animateSections();
    }
  }, 5000);

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
  });
  // Load theme from storage
  if (localStorage.getItem('theme') === 'dark') {
    themeToggle.checked = true;
    document.body.classList.add('dark');
  }
  fetch(`${API_BASE_URL}/api/profile`)
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.json();
    })
    .then(renderAbout)
    .catch(err => console.error('Error fetching profile:', err));

  fetch(`${API_BASE_URL}/api/skills`)
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.json();
    })
    .then(renderSkills)
    .catch(err => console.error('Error fetching skills:', err));

  fetch(`${API_BASE_URL}/api/projects`)
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.json();
    })
    .then(renderProjects)
    .catch(err => console.error('Error fetching projects:', err));

  fetch(`${API_BASE_URL}/api/contact`)
    .then(r => {
      if (!r.ok) throw new Error('Network response was not ok');
      return r.json();
    })
    .then(renderContact)
    .catch(err => console.error('Error fetching contact:', err));
});

function animateSections() {
  const sections = document.querySelectorAll('.section');
  sections.forEach((sec, i) => {
    sec.style.opacity = 0;
    setTimeout(() => {
      sec.style.transition = 'opacity 1s cubic-bezier(.68,-0.55,.27,1.55)';
      sec.style.opacity = 1;
    }, 400 + i * 300);
  });
}

function renderAbout(data) {
  document.getElementById('about').innerHTML = `
    <div class="about-flex">
      <div class="about-left">
        <div class="avatar-frame">
          <img src="/3a83de6d10689836c179.jpg" class="about-avatar main-avatar" />
        </div>
        <div class="about-gallery-vertical">
          <div class="gallery-frame"><img src="/d2ae21a86aade2f3bbbc.jpg" class="about-img small" /></div>
          <div class="gallery-frame"><img src="/fdd654dd81d8098650c9.jpg" class="about-img small" /></div>
        </div>
      </div>
      <div class="about-right">
        <div class="about-card">
          <h1 class="fade-in-title"><span class="highlight">${data.name}</span></h1>
          <div class="about-info-row"><span class="about-label">Ngày sinh:</span> <span class="about-value">${data.dob}</span></div>
          <div class="about-info-row"><span class="about-label">Trường:</span> <span class="about-value">${data.university}</span></div>
          <div class="about-info-row"><span class="about-label">Ngành:</span> <span class="about-value">${data.major}</span></div>
        </div>
        <div class="about-story-card">
          <p>${data.description}</p>
          <p>Mình là một người trẻ năng động, yêu thích công nghệ và sáng tạo. Từ nhỏ đã đam mê máy tính, mình luôn tìm tòi học hỏi những điều mới, đặc biệt là về lập trình web và thiết kế giao diện. Ngoài việc học, mình còn tham gia nhiều hoạt động ngoại khóa, câu lạc bộ công nghệ, và các dự án cộng đồng để phát triển kỹ năng mềm và mở rộng mối quan hệ.</p>
          <p>Phương châm sống của mình là: <span class="quote">"Không ngừng học hỏi, không ngừng tiến bộ"</span>. Mình tin rằng sự kiên trì và đam mê sẽ giúp mình đạt được mọi mục tiêu trong cuộc sống.</p>
        </div>
      </div>
    </div>
  `;
}

function renderSkills(skills) {
  document.getElementById('skills').innerHTML = `
    <h2 class="section-title">Kỹ năng nổi bật</h2>
    <div class="skills-flex">
      <ul class="skills-list">
        ${skills.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
      </ul>
      <div class="skills-desc">
        <p>Mình có nền tảng vững chắc về lập trình web hiện đại, sử dụng thành thạo các công nghệ như <b>ReactJS, ExpressJS, NodeJS</b> và thiết kế giao diện với <b>Figma, Photoshop</b>. Ngoài ra, mình còn có kinh nghiệm làm việc nhóm, quản lý dự án nhỏ, và luôn chủ động cập nhật xu hướng công nghệ mới.</p>
        <ul class="skills-extra">
          <li>Khả năng tự học nhanh, thích nghi tốt với môi trường mới.</li>
          <li>Giao tiếp tốt, biết lắng nghe và chia sẻ ý tưởng.</li>
          <li>Đã từng tham gia nhiều workshop, hackathon về công nghệ.</li>
          <li>Đam mê sáng tạo, thích thử nghiệm các hiệu ứng UI/UX mới lạ.</li>
        </ul>
      </div>
    </div>
  `;
}

function renderProjects(projects) {
  document.getElementById('projects').innerHTML = `
    <h2 class="section-title">Một số dự án tiêu biểu</h2>
    <div class="projects">
      ${projects.map((p, i) => `
        <div class="project-card animated-card" style="animation-delay:${i * 0.2 + 0.2}s">
          <img src="/project${(i%3)+1}.jpg" class="project-img" onerror="this.style.display='none'" />
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <ul class="project-detail">
            <li>Thời gian thực hiện: ${2023 + i} - ${2024 + i}</li>
            <li>Vai trò: ${i === 0 ? 'Fullstack Developer, UI/UX Designer' : i === 1 ? 'Frontend Developer' : 'Content Writer, Blogger'}</li>
            <li>Công nghệ: ${i === 0 ? 'ReactJS, ExpressJS, MongoDB' : i === 1 ? 'ReactJS, Drag&Drop, Notification API' : 'NextJS, Markdown, CSS Animation'}</li>
          </ul>
          <a href="${p.link}" target="_blank" class="project-link">Xem chi tiết</a>
        </div>
      `).join('')}
    </div>
    <div class="project-note">* Một số dự án demo, hình ảnh minh họa tự động sinh cho đẹp.</div>
  `;
}

function renderContact(data) {
  document.getElementById('contact').innerHTML = `
    <h2 class="section-title">Liên hệ</h2>
    <div class="contact-info">
      <p><b>Email:</b> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><b>Facebook:</b> <a href="${data.facebook}" target="_blank">${data.facebook}</a></p>
      <p><b>Github:</b> <a href="${data.github}" target="_blank">${data.github}</a></p>
      <p><b>Điện thoại:</b> ${data.phone}</p>
    </div>
  `;
}
