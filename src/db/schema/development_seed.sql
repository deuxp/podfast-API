INSERT INTO users (first_name, last_name, email, handle, password, about_me, avatar_link)
VALUES
('Sylvia', 'Palmer', 'palmer@example.com', 'SilverTongue', '123', 'Best in the biz!', 'https://i.imgur.com/LpaY82x.png'),
('Walter', 'White', 'ww@example.com', 'BreakingBad', '123', 'The end justifies the extreme', 'https://i.imgur.com/3tVgsra.jpg');

INSERT INTO minicasts (user_id, audio_link, banner_link, title, description, num_of_views, length_in_seconds)
VALUES
(1, '/assets/minicasts/This-Much-Will-Kill-You.mp3', '/assets/banners/universe.jpg', 'This amount will kill you', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 74, 10 ),
(1, '/assets/minicasts/This-Much-Will-Kill-You-2.mp3', '/assets/banners/animals.jpg', 'This amount will kill you part 2', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 50, 11 ),
(2, '/assets/minicasts/60SS-Stuttering.mp3', 'assets/banners/universe.jpg', '60 Second Science', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 50, 11 );

INSERT INTO tags (tag)
VALUES
('science'),
('music'),
('education'),
('news'),
('lifestyle'),
('trailers'),
('comedy');

INSERT INTO minicast_tags (minicast_id, tag_id)
VALUES
(1, 1),
(1, 7),
(2, 1),
(2, 2),
(3, 1), 
(3, 3);