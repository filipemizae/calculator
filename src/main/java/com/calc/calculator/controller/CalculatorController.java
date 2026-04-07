package com.calc.calculator.controller;

import  org.springframework.web.bind.annotation.CrossOrigin;
import  org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calc.calculator.model.OperationRequest;



@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")

public class CalculatorController {

    @PostMapping("/calculate")
    public double calculate(@RequestBody OperationRequest req) {
        return switch (req.getOperation()) {
            
            case "+" -> req.getNum1() + req.getNum2();
            case "-" -> req.getNum1() - req.getNum2();
            case "*" -> req.getNum1() * req.getNum2();
            case "/" -> {if(req.getNum2() == 0) throw new ArithmeticException("Divisão por zero não é possível!");
            yield req.getNum1() / req.getNum2();
        }
        default -> throw new IllegalArgumentException("Opção inválida!");

        };
    }
    
    


}
