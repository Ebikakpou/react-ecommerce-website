# React E-Commerce Application

## Overview

A modern e-commerce web application built with React and Vite. The project demonstrates frontend development concepts as well as DevOps practices such as containerization and Continuous Integration.

## Features

* Product Listing
* Product Details Page
* Shopping Cart Functionality
* Checkout Page
* React Context API State Management
* Responsive UI
* Docker Containerization
* GitHub Actions CI Pipeline

## Tech Stack

### Frontend

* React
* React Router
* Context API
* Vite

### DevOps

* Git
* GitHub
* GitHub Actions
* Docker
* Nginx

## Project Structure

```text
src/
├── components/
├── context/
├── pages/
├── data/
├── App.jsx
└── main.jsx
```

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Build Application

```bash
npm run build
```

## Docker Usage

Build image:

```bash
docker build -t ecommerce-react .
```

Run container:

```bash
docker run -p 8080:80 ecommerce-react
```

Application available at:

```text
http://localhost:8080
```

## Continuous Integration

GitHub Actions automatically:

* Installs dependencies
* Runs ESLint checks
* Builds the React application
* Builds the Docker image

on every push to the main branch.

## Learning Objectives

This project demonstrates:

* Modern React development
* State management using Context API
* Component-based architecture
* Docker containerization
* CI/CD using GitHub Actions
* DevOps automation workflows
