SELECT minicasts.id, user_id, audio_link, banner_link, title, description, minicasts.active, minicasts.created_at
FROM minicasts
JOIN users ON minicasts.user_id = users.id
WHERE user_id = 1
ORDER BY minicasts.created_at DESC;

-- 1 is hardcoded for now
