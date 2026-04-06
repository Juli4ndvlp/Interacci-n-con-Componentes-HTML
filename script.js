
const select = document.getElementById('category-select');
const customCategory = document.getElementById('custom-category');

select.addEventListener('change', function() {
    if (this.value === 'Otra') {
        customCategory.style.display = 'block';
    } else {
        customCategory.style.display = 'none';
    }
});

