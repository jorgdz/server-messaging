package com.home.springsocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.home.springsocket.entity.SendData;

@Controller
public class SocketController {

	@MessageMapping("/send")  // Cliente origen
  	@SendTo("/topic/something") // Cliente destino
	public SendData greeting(SendData sendData) throws Exception {
		Thread.sleep(1000); // simulated delay
     	return sendData;
	}
}
