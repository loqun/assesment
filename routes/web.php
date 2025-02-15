<?php
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;



Route::get('/', [HomeController::class, 'home'])->name('home');

Route::get('/form',[HomeController::class, 'form'])->name('form');



