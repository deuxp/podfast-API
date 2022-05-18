SELECT * FROM favourites
                   WHERE user_id = 3
                   AND minicast_id =2
                   ORDER BY favourites.created_at DESC
                  LIMIT 1;