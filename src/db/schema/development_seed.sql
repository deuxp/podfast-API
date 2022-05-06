INSERT INTO users (first_name, last_name, email, handle, password, about_me, avatar_link)
VALUES
('Sylvia', 'Palmer', 'palmer@example.com', 'SilverTongue', '123', 'Best in the biz!', 'https://i.imgur.com/LpaY82x.png'),
('Walter', 'White', 'ww@example.com', 'BreakingBad', '123', 'The end justifies the extreme', 'https://i.imgur.com/3tVgsra.jpg');

INSERT INTO minicasts (user_id, audio_link, banner_link, title, description, num_of_views, length_in_seconds)
VALUES
(1, 'iwillnotputsecretkeysinGitHub@lessons.com', 'noatrealink.com', 'Lorem Ipsum is the title', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 74, 10 ),
(2, 'iwillnotputsecretkeysinGitHub@lessons.com', 'noatrealink.com', 'Lorem Ipsum is the title', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout... ', 50, 11 );
