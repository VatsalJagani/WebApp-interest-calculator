function calculate_compound_interest(P, R, N, T){
    // interest calculation is "compound"
    // A = P(1 + r/n)^nt
    R = R/100;   // for the equation rate required in decimal
    let A = P * Math.pow((1 + R/N), (N*T));
    return A;
}

PAYMENT_MODE_MONTHLY = "Monthly"
PAYMENT_MODE_YEARLY = "Yearly"

function calculate_interest(principle_amount, payment_period_mode, payment_period, interest_rate, total_period, compound_interest_calculation_period=4){
    /*
    calculate is actually returns final accrued amount and not only the interest
    principle_amount
    payment_period_mode - mode of payment (monthly/hourly)
    payment_period - number of month/year depends on the payment_period_mode
    interest_rate - rate of interest in percentage
    total_period - total period after which you want amount (in years)
    compound_interest_calculation_period - default is 4 which means quarterly interest added to principle amount
    */
    console.log(principle_amount, payment_period_mode, payment_period, interest_rate, total_period, compound_interest_calculation_period)
    let total = 0;
    let left_period_of_time = 0;
    if(payment_period_mode === PAYMENT_MODE_MONTHLY){
        for(let i=0; i<payment_period; i++){
            total += calculate_compound_interest(principle_amount, interest_rate, compound_interest_calculation_period, (payment_period-i)/12);
        }
        left_period_of_time = total_period - payment_period/12;
    }
    else if(payment_period_mode === PAYMENT_MODE_YEARLY){
        for(let i=0; i<payment_period; i++){
            total += calculate_compound_interest(principle_amount, interest_rate, compound_interest_calculation_period, payment_period-i);
        }
        left_period_of_time = total_period - payment_period;
    }
    
    return calculate_compound_interest(total, interest_rate, compound_interest_calculation_period, left_period_of_time);
}

function calculate_interest_on_values(){
    $("#result_div").hide()
    $("#error_div").hide()

    let p = parseFloat($("#principle_amount").val())
    if(isNaN(p)){
        $("#error_id").text("Please enter valid Principle amount.");
        $("#error_div").show();
        return;
    }

    let r = parseFloat($("#interest_rate").val())
    if(isNaN(r)){
        $("#error_id").text("Please enter valid interest rate value.");
        $("#error_div").show();
        return;
    }

    let payment_period = parseFloat($("#payment_period").val())
    if(isNaN(payment_period)){
        $("#error_id").text("Please enter valid Payment period time.");
        $("#error_div").show();
        return;
    }

    let total_period = parseFloat($("#total_period").val())
    if(isNaN(total_period)){
        $("#error_id").text("Please enter valid total period of time.");
        $("#error_div").show();
        return;
    }

    let payment_period_mode = $("input[name='payment_mode']:checked").val();
    
    if( (payment_period_mode == PAYMENT_MODE_MONTHLY && total_period - payment_period/12 < 0) || 
        (payment_period_mode == PAYMENT_MODE_YEARLY && total_period - payment_period < 0) ){
        $("#error_id").text("Total time period should larger than payment term.");
        $("#error_div").show();
        return;
    }

    let compound = $("select[name='compound_interest_calculation_period'] option:selected").val();

    $("#result_id").text(calculate_interest(p, payment_period_mode, payment_period, r, total_period, compound));
    $("#result_div").show()
}

$("#submit_btn").on("click", function(e){
    calculate_interest_on_values();
})