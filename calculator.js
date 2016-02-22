function evaluate(op, op1, op2) {
    op1 = parseFloat(op1);
    op2 = parseFloat(op2);
    var result = NaN;
    if (op === "+") 
        result = op1 + op2;
    if (op === "\u2212") //minus
        result = op1 - op2;
    if (op === "\u00d7") //times
        result = op1 * op2;
    if (op === "\u00f7") {//divide
        if (op2 !== 0)
            result = op1 / op2;
    }
    if (isNaN(result))
        result = "Not a number";
    return result;
}

$(document).ready(function() {
    var is_typing = false;
    var has_dot = false;
    var is_cleared = true;
    var op1_str = "";

    $(".btn-number").click(function() {
        is_cleared = false;
        var digit = $(this).text();
        var output = $("#output").text();
        if (!is_typing) {
            if (digit !== "0" || output !== "0") {
                output = digit;
                is_typing = true;
            }
        } else {
            if (output.length < 17)           
                output = output + digit;
        }
        $("#output").text(output);
    });
    
    $("#btn-clear").click(function() {
        is_cleared = true;
        is_typing = false;
        has_dot = false;
        $("#output").text("0");
        $("#operator").text("");
    });
    
    $("#btn-dot").click(function() {
        if (!has_dot && (is_typing || is_cleared)) {
            has_dot = true;
            is_typing = true;
            $("#output").text($("#output").text() + ".");
        }
        is_cleared = false;
    });
    
    $("#btn-negate").click(function() {
        if (is_cleared) return;
        var output_str = $("#output").text().trim();
        if (output_str[0] === "-")
            output_str = output_str.replace("-", "");
        else if (output_str !== '0')
            output_str = "-" + output_str;
        $("#output").text(output_str);
    });
    
    $(".btn-operator").click(function () {
        if (op1_str !== "") {
            var result = evaluate($("#operator").text(), op1_str, $("#output").text());
            $("#output").text(result);
            op1_str = "";
        }
        op1_str = $("#output").text();
        $("#operator").text($(this).text());
        is_typing = false;
        has_dot = false;
        is_cleared = false;
    })
    
    $("#btn-eq").click(function() {
        is_typing = false;
        has_dot = false;
        is_cleared = false;
        var op = $("#operator").text();
        if (op1_str !== "") {
            var result = evaluate(op, op1_str, $("#output").text())
            op1_str = "";
            $("#operator").text("");
            $("#output").text(result.toString());
        }
    });
});