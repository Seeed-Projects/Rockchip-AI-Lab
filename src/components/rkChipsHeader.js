// RK Chips Header component
document.addEventListener('DOMContentLoaded', function() {
    const headerHtml = `
        <div class="rk-chips-header">
            <div class="rk-chip">
                <h3>RK3588</h3>
                <p>Octa-core 64-bit processor with integrated NPU for AI applications</p>
            </div>
            <div class="rk-chip">
                <h3>RK1820</h3>
                <p>High-performance AI processor optimized for edge computing</p>
            </div>
        </div>
    `;
    
    // Insert after the opening body tag or at the beginning of the body
    document.getElementById('rk-chips-header').innerHTML = headerHtml;
});