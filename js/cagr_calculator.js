
TERM_IN_MONTHS = "Months"
TERM_IN_YEARS = "Years"

function calculate_cagr(principle_amount, term_period, final_amount){
    /*
    calculates the interest based on principle amount and final amount
    principle_amount
    term_period - term in years
    final_amount - final amount you will get
    */
    console.log("CAGR calculation", principle_amount, term_period, final_amount)
    let cagr = Math.pow((final_amount/principle_amount), (1/term_period)) - 1;
    return cagr;
}

function calculate_cagr_on_values(){
    $("#cagr_result_div").hide()
    $("#cagr_error_div").hide()

    let p = parseFloat($("#cagr_principle_amount").val())
    if(isNaN(p)){
        $("#cagr_error_id").text("Please enter valid Principle amount.");
        $("#cagr_error_div").show();
        return;
    }

    let total_period = parseFloat($("#cagr_total_period").val())
    if(isNaN(total_period)){
        $("#cagr_error_id").text("Please enter valid total period of time.");
        $("#cagr_error_div").show();
        return;
    }

    let term_in = $("input[name='cagr_term_in']:checked").val();
    if(term_in == TERM_IN_MONTHS){
        total_period = total_period/12;
    }

    let final_amount = parseFloat($("#cagr_final_amount").val())
    if(isNaN(final_amount)){
        $("#cagr_error_id").text("Please enter valid final amount.");
        $("#cagr_error_div").show();
        return;
    }

    let cagr = calculate_cagr(p, total_period, final_amount);
    cagr = Math.round(cagr * 100 * 100) / 100;

    $("#cagr_answer").text(`${cagr} %`);
    $("#cagr_result_div").show()
}

$("#cagr_submit_btn").on("click", function(e){
    calculate_cagr_on_values();
})