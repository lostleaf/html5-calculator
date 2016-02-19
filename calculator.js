$(document).ready(function() {
    var is_typing = false;
    var has_dot = false;
    var is_cleared = true;
    var op1_str = "";
    $(".btn-number").click(function() {
        is_cleared = false;
        var digit = $(this).text();
        if (!is_typing) {
            $("#output").text(digit);
            is_typing = true;
        } else {
            var output = $("#output");
            if (output.text().length < 17)           
                output.text(output.text() + digit);
        }
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
        if (output_str[0] === "\u2212")
            output_str = output_str.replace("\u2212", "");
        else if (output_str !== '0')
            output_str = "\u2212" + output_str;
        $("#output").text(output_str);
    });
    
    $(".btn-operator").click(function () {
        $("#operator").text($(this).text());
        op1_str = $("#output").text();
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
            var op1 = parseFloat(op1_str);
            var op2 = parseFloat($("#output").text());
            var result = NaN;
            if (op === "+") 
                result = op1 + op2;
            if (op === "\u2212") //minus
                result = op1 - op2;
            if (op === "\u00d7") //times
                result = op1 * op2;
            if (op === "\u00f7") //divide
                result = op1 / op2;
            op1_str = "";
            $("#operator").text("");
            $("#output").text(result.toString());
        }
    });
});