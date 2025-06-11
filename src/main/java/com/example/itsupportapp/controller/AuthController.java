package com.example.itsupportapp.controller;

import com.example.itsupportapp.dto.LoginRequest;
import com.example.itsupportapp.dto.SignupRequest;
import com.example.itsupportapp.dto.Token;
import com.example.itsupportapp.security.jwt.JwtUtils;
import com.example.itsupportapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Token registerUser(@RequestBody SignupRequest signUpRequest) {
        // Étape 1 : Enregistrer l'utilisateur
        authService.registerUser(signUpRequest);

        // Étape 2 : Authentifier le nouvel utilisateur
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Étape 3 : Générer et retourner directement le token
        String jwt = jwtUtils.generateJwtToken(authentication);
        return new Token(jwt);
    }

    @PostMapping("/signin")
    public Token authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);
        return new Token(jwt);
    }
}