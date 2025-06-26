package br.ueg.progwebi.collegeapi.controller;

import br.ueg.progwebi.collegeapi.dto.VeiculoDataDTO;
import br.ueg.progwebi.collegeapi.model.Veiculo;
import br.ueg.progwebi.collegeapi.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/veiculo")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public List<Veiculo> listAll() {
        return veiculoService.listAll();
    }

    @PostMapping
    public ResponseEntity<Veiculo> create(@RequestBody VeiculoDataDTO veiculoDTO) {
        Veiculo novoVeiculo = veiculoDTOToModel(veiculoDTO);
        return ResponseEntity.ok(veiculoService.create(novoVeiculo));
    }

    private static Veiculo veiculoDTOToModel(VeiculoDataDTO veiculoDTO) {
        return Veiculo.builder()
                .modelo(veiculoDTO.getModelo())
                .chassi(veiculoDTO.getChassi())
                .dataFabricacao(veiculoDTO.getDataFabricacao())
                .placa(veiculoDTO.getPlaca())
                .vendido(veiculoDTO.getVendido())
                .quilometragem(veiculoDTO.getQuilometragem())
                .build();
    }

    @PutMapping(path = "/{id}")
    public Veiculo update(@PathVariable Long id, @RequestBody VeiculoDataDTO veiculoDTO) {
        Veiculo veiculoAtualizado = veiculoDTOToModel(veiculoDTO);
        return veiculoService.update(id, veiculoAtualizado);
    }

    @GetMapping(path = "/{id}")
    public Veiculo getById(@PathVariable Long id) {
        return veiculoService.getById(id);
    }

    @DeleteMapping(path = "/{id}")
    public Veiculo delete(@PathVariable Long id) {
        return veiculoService.delete(id);
    }
}
