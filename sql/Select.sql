select * from players;

select * from games;

select * from sessions;

select s.*, g.title from sessions s join games g on s.game_id = g.game_id order by start_date desc;

select * from developers;

select * from game_developer;

select * from game_genre;

SELECT g.game_id, g.title, genres.genre_id, genres.name FROM games g
left join game_genre gg on g.game_id = gg.game_id
left join genres on gg.genre_id = genres.genre_id
left join game_theme gt on g.game_id = gt.game_id
left join themes on gt.theme_id = themes.theme_id
WHERE title = 'Animal Well';



