<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Задача
 * Только владелец задачи может ее редактировать
 *
 * @property string $stage Стадия выполнения задачи new|in_work|deleted
 * @property string $title Название задачи
 * @property string $description Описание Задачи
 * @property bool $is_private Задачу видит только владелец
 * @property int $author_id Владелец задачи
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Todo extends Model
{
    protected $fillable = [
        'stage',
        'title',
        'description',
    ];
}
