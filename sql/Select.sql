Fantasselect * from players;

select * from games;

select * from sessions;

select s.*, g.title from sessions s join games g on s.game_id = g.game_id order by start_date desc;

select s.*, g.title, p.name
from sessions s 
join games g on s.game_id = g.game_id 
join session_player sp on s.session_id = sp.session_id
join players p on sp.player_id = p.player_id
order by s.start_date desc;

select * from developers;

select * from game_developer;

select * from game_genre;

SELECT g.game_id, g.title, genres.genre_id, genres.name FROM games g
left join game_genre gg on g.game_id = gg.game_id
left join genres on gg.genre_id = genres.genre_id
WHERE title = 'Animal Well';

SELECT g.game_id, g.title, themes.theme_id, themes.name FROM games g
left join game_theme gt on g.game_id = gt.game_id
left join themes on gt.theme_id = themes.theme_id
WHERE title = 'Animal Well';

SELECT g.game_id, g.title, developers.developer_id, developers.name FROM games g
left join game_developer gd on g.game_id = gd.game_id
left join developers on gd.developer_id = developers.developer_id
WHERE title = 'Animal Well';

SELECT * FROM games g
WHERE title = 'Animal Well';



