<?php

class Memo {
    public $memo_aid;
    public $memo_is_active;
    public $memo_from;
    public $memo_to;
    public $memo_date;
    public $memo_category;
    public $memo_text;
    public $memo_created;
    public $memo_updated;

    public $search;
    public $start;
    public $total;

    public $connection;
    public $tblMemo;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblMemo = "memo";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblMemo} ";
            $sql .= "(memo_is_active, memo_from, memo_to, memo_date, memo_category, memo_text, memo_created, memo_updated) values ";
            $sql .= "(:memo_is_active, :memo_from, :memo_to, :memo_date, :memo_category, :memo_text, :memo_created, :memo_updated)";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_is_active" => $this->memo_is_active,
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_created" => $this->memo_created,
                "memo_updated" => $this->memo_updated,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readAll() {
        try {
            $sql = "select * from {$this->tblMemo} ";
            $sql .= "where true ";
            $sql .= $this->memo_is_active !== "" ? "and memo_is_active = :memo_is_active " : "";
            $sql .= $this->search !== "" ? "and ( " : "";
            $sql .= $this->search !== "" ? "memo_from like :memo_from " : "";
            $sql .= $this->search !== "" ? "or memo_to like :memo_to " : "";
            $sql .= $this->search !== "" ? "or memo_date like :memo_date " : "";
            $sql .= $this->search !== "" ? "or memo_category like :memo_category " : "";
            $sql .= $this->search !== "" ? "or memo_text like :memo_text " : "";
            $sql .= $this->search !== "" ? ") " : "";
            $sql .= "order by memo_created desc ";

            $query = $this->connection->prepare($sql);

            if ($this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", $this->memo_is_active, PDO::PARAM_INT);
            }

            if ($this->search !== "") {
                $query->bindValue(":memo_from", "%{$this->search}%");
                $query->bindValue(":memo_to", "%{$this->search}%");
                $query->bindValue(":memo_date", "%{$this->search}%");
                $query->bindValue(":memo_category", "%{$this->search}%");
                $query->bindValue(":memo_text", "%{$this->search}%");
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readLimit() {
        try {
            $sql = "select * from {$this->tblMemo} ";
            $sql .= "where true ";
            $sql .= $this->memo_is_active !== "" ? "and memo_is_active = :memo_is_active " : "";
            $sql .= $this->search !== "" ? "and ( " : "";
            $sql .= $this->search !== "" ? "memo_from like :memo_from " : "";
            $sql .= $this->search !== "" ? "or memo_to like :memo_to " : "";
            $sql .= $this->search !== "" ? "or memo_date like :memo_date " : "";
            $sql .= $this->search !== "" ? "or memo_category like :memo_category " : "";
            $sql .= $this->search !== "" ? "or memo_text like :memo_text " : "";
            $sql .= $this->search !== "" ? ") " : "";
            $sql .= "order by memo_created desc ";
            $sql .= "limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int)$this->start, PDO::PARAM_INT);
            $query->bindValue(":total", (int)$this->total, PDO::PARAM_INT);

            if ($this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", $this->memo_is_active, PDO::PARAM_INT);
            }

            if ($this->search !== "") {
                $query->bindValue(":memo_from", "%{$this->search}%");
                $query->bindValue(":memo_to", "%{$this->search}%");
                $query->bindValue(":memo_date", "%{$this->search}%");
                $query->bindValue(":memo_category", "%{$this->search}%");
                $query->bindValue(":memo_text", "%{$this->search}%");
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function update() {
        try {
            $sql = "update {$this->tblMemo} set ";
            $sql .= "memo_from = :memo_from, ";
            $sql .= "memo_to = :memo_to, ";
            $sql .= "memo_date = :memo_date, ";
            $sql .= "memo_category = :memo_category, ";
            $sql .= "memo_text = :memo_text, ";
            $sql .= "memo_updated = :memo_updated ";
            $sql .= "where memo_aid = :memo_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_updated" => $this->memo_updated,
                "memo_aid" => $this->memo_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

public function active() {
    try {
        $sql = "update {$this->tblMemo} ";
        $sql .= "set memo_is_active = if(memo_is_active = 1, 0, 1) ";
        $sql .= "where memo_aid = :memo_aid ";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "memo_aid" => $this->memo_aid,
        ]);
    } catch (PDOException $e) {
        $query = false;
    }

    return $query;
}

    public function delete() {
        try {
            $sql = "delete from {$this->tblMemo} where memo_aid = :memo_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_aid" => $this->memo_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}