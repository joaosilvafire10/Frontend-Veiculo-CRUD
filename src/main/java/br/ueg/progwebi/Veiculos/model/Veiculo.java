package br.ueg.progwebi.collegeapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Veiculo {

    public static final String SEQUENCE_NAME = "VEICULO_ID_GENERATE";

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = SEQUENCE_NAME)
    @SequenceGenerator(
            name = SEQUENCE_NAME,
            sequenceName = SEQUENCE_NAME + "_bd",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "MODELO", length = 200, nullable = false)
    private String modelo;

    @Column(name = "CHASSI", length = 17,nullable = false, unique = true)
    private String chassi;

    @Column(name = "DATA_FABRICACAO", nullable = false)
    private LocalDate dataFabricacao;

    @Column(name = "PLACA", nullable = false, unique = true)
    private String placa;

    @Column(name = "VENDIDO", nullable = false)
    private Boolean vendido;

    @Column(name = "QUILOMETRAGEM", nullable = false)
    private Long quilometragem;
}