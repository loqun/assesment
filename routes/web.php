<?php
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;



Route::get('/home', [HomeController::class, 'home'])->name('home');

Route::get('/',[HomeController::class, 'form'])->name('form');



