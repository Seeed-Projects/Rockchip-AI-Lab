// Navigation component
document.addEventListener('DOMContentLoaded', function() {
    const navHtml = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="pages/home.html" class="nav-logo">Rockchip AI Lab</a>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="pages/home.html" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="pages/cv.html" class="nav-link">CV</a>
                    </li>
                    <li class="nav-item">
                        <a href="pages/llm.html" class="nav-link">LLM</a>
                    </li>
                    <li class="nav-item">
                        <a href="pages/vlm.html" class="nav-link">VLM</a>
                    </li>
                    <li class="nav-item">
                        <a href="pages/ui.html" class="nav-link">UI</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navHtml);
});