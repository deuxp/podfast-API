SELECT minicasts.id, audio_link, banner_link, title, description, minicasts.created_at, user_id, avatar_link, handle
FROM minicasts
JOIN users ON minicasts.user_id = users.id
ORDER BY minicasts.created_at DESC
limit 10