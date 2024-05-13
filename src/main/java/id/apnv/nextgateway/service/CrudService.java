package id.apnv.nextgateway.service;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public abstract class CrudService<T, ID> {

    private CrudRepository<T, ID> crudRepository;

    public CrudService(CrudRepository<T, ID> crudRepository) {
        this.crudRepository = crudRepository;
    }

    public Iterable<T> getAll() {
        return crudRepository.findAll();
    }

    public Optional<T> getById(ID id) {
        return crudRepository.findById(id);
    }

    public T create(T entity) {
        return crudRepository.save(entity);
    }

    public T update(ID id, T entity) {
        return crudRepository.save(entity);
    }

    public void delete(ID id) {
        crudRepository.deleteById(id);
    }

    public boolean existsById(ID id) {
        return crudRepository.existsById(id);
    }
}
