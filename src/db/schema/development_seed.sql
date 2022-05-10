INSERT INTO users (first_name, last_name, email, handle, password, about_me, avatar_link)
VALUES
('Sylvia', 'Palmer', 'palmer@example.com', 'SilverTongue', '123', 'Best in the biz!', 'https://i.imgur.com/LpaY82x.png'),
('Walter', 'White', 'ww@example.com', 'BreakingBad', '123', 'The end justifies the extreme', 'https://i.imgur.com/3tVgsra.jpg');

INSERT INTO minicasts (user_id, audio_link, banner_link, title, description, num_of_views, length_in_seconds)
VALUES
(1, 'https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav', 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80', 'The Gettysburg Address', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 322, 17 ),
(1, 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'Pink Panther theme', 'A mild distraction for your day... ', 1000, 30 ),
(2, 'https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'The Taunting', 'Monty Python rules', 50, 4 ),
(2, 'https://www2.cs.uic.edu/~i101/SoundFiles/preamble.wav', 'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80', 'We the people', 'A series of american greats', 180, 19 );

INSERT INTO tags (tag)
VALUES
('science'),
('music'),
('education'),
('news'),
('lifestyle'),
('trailers'),
('comedy'),
('history');

INSERT INTO minicast_tags (minicast_id, tag_id)
VALUES
(1, 8),
(1, 3),
(2, 7),
(2, 5),
(3, 2),
(3, 5), 
(3, 7),
(4, 8),
(4, 3);
