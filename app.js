// GRAB form & add event listener

document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';
  // set a timeout for loader and call function calculateResults after 2 sec
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// FUNCTION: calculateResults

function calculateResults(){
  console.log('calculating');
  // create variabel for each user interface element
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) *12;

  // compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // SHOW results
    document.getElementById('results').style.display = 'block';
    // HIDE loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// FUNCTION: showError

function showError(error){
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // hide results
  document.getElementById('results').style.display = 'none';
  // HIDE loader
  document.getElementById('loading').style.display = 'none';
  // create div
  const errorDiv = document.createElement('div');
  // add class to div
  errorDiv.className = 'alert alert-danger'; 
  // create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert error div above heading
  card.insertBefore(errorDiv, heading);
  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// FUNCTION: clearError

function clearError(){
  document.querySelector('.alert').remove();
}

 
