package org.generation.SpringBootAssessment.service;


import org.generation.SpringBootAssessment.repository.entity.Item;
import org.generation.SpringBootAssessment.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceMySQL implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceMySQL(@Autowired ItemRepository itemRepository ) { this.itemRepository = itemRepository; }


    @Override
    public Item save ( Item item ) {
        return itemRepository.save( item );
    }


    @Override
    public List<Item> all() {
        List<Item> result = new ArrayList<>();
        itemRepository.findAll().forEach(result::add);
        return result;
    }

}
