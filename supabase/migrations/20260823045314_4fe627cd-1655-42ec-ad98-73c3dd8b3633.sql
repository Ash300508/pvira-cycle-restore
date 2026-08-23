UPDATE public.drop_off_centres SET name = replace(name, 'PVIRA', 'PAVITRA'), instructions = replace(instructions, 'PVIRA', 'PAVITRA');
UPDATE public.notifications SET title = replace(title, 'PVIRA', 'PAVITRA'), body = replace(body, 'PVIRA', 'PAVITRA');
UPDATE public.eco_points SET reason = replace(reason, 'PVIRA', 'PAVITRA');