package com.longpo.service;

import java.util.List;

import com.longpo.model.Forum;



public interface ForumService {

	public List<Forum> getAll();

	public void save(String name, String description);

	public void delete(Long id);

	public Forum getById(Long id);

	public void update(Long id, String name, String description);

	public void up(Long id);

	public void down(Long id);

	


}
