function calculate() 
{
    const subtotal = parseFloat(document.getElementById('subtotal').value);
    const percentage = parseFloat(document.getElementById('percentage').value);

    const tip = subtotal * (percentage / 100);
    const total = subtotal + tip;

    document.getElementById('tip').textContent = '$' + tip.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}