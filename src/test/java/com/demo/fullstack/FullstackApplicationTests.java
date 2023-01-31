package com.demo.fullstack;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class FullstackApplicationTests {

	Calculator underTest = new Calculator();

	@Test
	void itShouldAddTwoNumbers() {
		int firstNum = 10;
		int secondNum = 40;

		int result = underTest.add(firstNum, secondNum);

		assertThat(result).isEqualTo(50);
	}

	class Calculator {
		int add(int a, int b) {
			return a + b;
		}
	}

}
