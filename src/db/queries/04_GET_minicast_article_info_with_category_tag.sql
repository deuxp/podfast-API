SELECT minicasts.id, minicasts.user_id, audio_link, banner_link, title, description, tag
FROM minicasts
JOIN minicast_tags ON minicasts.id = minicast_id
JOIN tags ON tags.id = tag_id
WHERE tag = 'education'; -- testing line
-- WHERE tag = $1;


--  this needs a WHERE clause that filters by tag name else you get duplicate
--  responses of minicasts with more than one tag name associated with it